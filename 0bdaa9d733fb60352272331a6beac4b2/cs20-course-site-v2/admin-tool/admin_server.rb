#!/usr/bin/env ruby
# Local admin tool for the course site.
#
# Run with:  ruby admin_server.rb
# Then open: http://localhost:4567
#
# Uses only Ruby's standard library (webrick + yaml + json), so nothing extra
# to install beyond Ruby itself, which you already have for Jekyll.

require 'webrick'
require 'yaml'
require 'json'
require 'fileutils'
require 'open3'

ROOT = File.expand_path('..', __dir__)
PUBLIC_DIR = File.join(__dir__, 'public')
PORT = (ENV['ADMIN_PORT'] || 4567).to_i

CONTENT_DIRS = %w[pages assignments quizzes discussion_topics module_items modules]

# ---------- front matter helpers ----------

FM_RE = /\A---\n(.*?)\n---\n(.*)\z/m

def read_front_matter(path)
  raw = File.read(path, encoding: 'UTF-8')
  m = FM_RE.match(raw)
  return [{}, raw] unless m
  fm = YAML.safe_load(m[1], permitted_classes: [Symbol], aliases: true) || {}
  [fm, m[2]]
end

def write_front_matter(path, fm, body)
  dumped = YAML.dump(fm)
  dumped = dumped.sub(/\A---\n/, '')
  content = "---\n#{dumped}---\n#{body}"
  File.write(path, content, encoding: 'UTF-8')
end

def relpath(path)
  path.sub("#{ROOT}/", '')
end

# ---------- scan the site into a JSON-able structure ----------

def scan_structure
  docs = {} # item_id or module_slug => { fm:, path: }
  CONTENT_DIRS.each do |dir|
    dir_path = File.join(ROOT, dir)
    next unless Dir.exist?(dir_path)
    Dir.glob(File.join(dir_path, '*.md')).sort.each do |path|
      fm, _body = read_front_matter(path)
      next if fm.empty?
      docs[relpath(path)] = fm.merge('__path' => relpath(path), '__dir' => dir)
    end
  end

  modules = []
  docs.each do |_relp, fm|
    next unless fm['__dir'] == 'modules'
    modules << {
      'slug' => fm['module_slug'],
      'title' => fm['title'],
      'order' => fm['module_order'],
      'published' => fm.fetch('published', true),
      'file' => fm['__path'],
      'items' => [],
    }
  end
  modules.sort_by! { |m| m['order'].to_i }

  by_slug = {}
  modules.each { |m| by_slug[m['slug']] = m }

  unfiled = []

  placements = [] # {slug_or_nil, position, doc}
  docs.each do |_relp, fm|
    next if fm['__dir'] == 'modules'
    item = {
      'item_id' => fm['item_id'],
      'title' => fm['title'],
      'nav_title' => fm['nav_title'] || fm['title'],
      'published' => fm.fetch('published', true),
      'external' => fm.fetch('external', false),
      'is_divider' => fm.fetch('is_divider', false),
      'is_orphan' => fm.fetch('is_orphan', false),
      'kind' => fm['__dir'],
      'file' => fm['__path'],
    }
    placed = false
    if fm['primary_module_slug'] && by_slug[fm['primary_module_slug']]
      placements << [fm['primary_module_slug'], fm['primary_position'].to_i, item]
      placed = true
    end
    if fm['secondary_module_slug'] && by_slug[fm['secondary_module_slug']]
      placements << [fm['secondary_module_slug'], fm['secondary_position'].to_i, item.merge('secondary' => true)]
      placed = true
    end
    unfiled << item unless placed
  end

  placements.sort_by { |slug, pos, _| [slug, pos] }.each do |slug, _pos, item|
    by_slug[slug]['items'] << item
  end

  { 'modules' => modules, 'unfiled' => unfiled }
end

# ---------- apply an edited structure back to front matter ----------

def apply_structure(payload)
  changes = []

  (payload['modules'] || []).each do |mod|
    path = File.join(ROOT, mod['file'])
    next unless File.exist?(path)
    fm, body = read_front_matter(path)
    if fm['published'] != mod['published']
      fm['published'] = mod['published']
      write_front_matter(path, fm, body)
      changes << mod['file']
    end

    (mod['items'] || []).each_with_index do |item, idx|
      next if item['is_divider']
      item_path = find_item_path(item)
      next unless item_path
      fm2, body2 = read_front_matter(item_path)
      dirty = false
      new_slug = mod['slug']
      new_pos = idx + 1
      if item['secondary']
        if fm2['secondary_module_slug'] != new_slug || fm2['secondary_position'] != new_pos
          fm2['secondary_module_slug'] = new_slug
          fm2['secondary_position'] = new_pos
          dirty = true
        end
      else
        if fm2['primary_module_slug'] != new_slug || fm2['primary_position'] != new_pos
          fm2['primary_module_slug'] = new_slug
          fm2['primary_position'] = new_pos
          dirty = true
        end
      end
      if fm2.fetch('published', true) != item['published']
        fm2['published'] = item['published']
        dirty = true
      end
      if fm2.key?('is_orphan')
        fm2.delete('is_orphan')
        dirty = true
      end
      if dirty
        write_front_matter(item_path, fm2, body2)
        changes << relpath(item_path)
      end
    end
  end

  (payload['unfiled'] || []).each do |item|
    item_path = find_item_path(item)
    next unless item_path
    fm2, body2 = read_front_matter(item_path)
    dirty = false
    if fm2['primary_module_slug']
      fm2.delete('primary_module_slug')
      fm2.delete('primary_position')
      dirty = true
    end
    if fm2['secondary_module_slug']
      fm2.delete('secondary_module_slug')
      fm2.delete('secondary_position')
      dirty = true
    end
    unless fm2['is_orphan']
      fm2['is_orphan'] = true
      dirty = true
    end
    if fm2.fetch('published', true) != item['published']
      fm2['published'] = item['published']
      dirty = true
    end
    if dirty
      write_front_matter(item_path, fm2, body2)
      changes << relpath(item_path)
    end
  end

  changes
end

def find_item_path(item)
  return File.join(ROOT, item['file']) if item['file'] && File.exist?(File.join(ROOT, item['file']))
  nil
end

# ---------- git operations ----------

def run_git(*args)
  stdout, stderr, status = Open3.capture3('git', *args, chdir: ROOT)
  { 'cmd' => (['git'] + args).join(' '), 'stdout' => stdout, 'stderr' => stderr, 'ok' => status.success? }
end

def rebuild_and_push(commit_message)
  results = []
  results << run_git('add', '-A')
  status = run_git('status', '--porcelain')
  has_changes = !status['stdout'].strip.empty?
  if has_changes
    commit = run_git('commit', '-m', commit_message)
    results << commit
    unless commit['ok']
      return { 'ok' => false, 'log' => results }
    end
  else
    results << { 'cmd' => '(nothing to commit)', 'stdout' => '', 'stderr' => '', 'ok' => true }
  end

  push = run_git('push')
  results << push
  if !push['ok'] && push['stderr'] =~ /no upstream branch|set-upstream/i
    branch = Open3.capture3('git', 'rev-parse', '--abbrev-ref', 'HEAD', chdir: ROOT)[0].strip
    retry_push = run_git('push', '-u', 'origin', branch)
    results << retry_push
    return { 'ok' => retry_push['ok'], 'log' => results }
  end
  { 'ok' => push['ok'], 'log' => results }
end

# ---------- HTTP server ----------

server = WEBrick::HTTPServer.new(
  Port: PORT,
  DocumentRoot: PUBLIC_DIR,
  Logger: WEBrick::Log.new(File::NULL),
  AccessLog: []
)

server.mount_proc '/api/structure' do |req, res|
  res['Content-Type'] = 'application/json'
  case req.request_method
  when 'GET'
    res.body = JSON.generate(scan_structure)
  when 'POST'
    payload = JSON.parse(req.body)
    changes = apply_structure(payload)
    res.body = JSON.generate({ 'ok' => true, 'changed_files' => changes })
  else
    res.status = 405
  end
rescue => e
  res.status = 500
  res.body = JSON.generate({ 'ok' => false, 'error' => e.message })
end

server.mount_proc '/api/publish' do |req, res|
  res['Content-Type'] = 'application/json'
  payload = req.body && !req.body.empty? ? JSON.parse(req.body) : {}
  message = payload['message'] || 'Update course structure via admin tool'
  result = rebuild_and_push(message)
  res.body = JSON.generate(result)
rescue => e
  res.status = 500
  res.body = JSON.generate({ 'ok' => false, 'error' => e.message })
end

server.mount_proc '/api/ping' do |req, res|
  res['Content-Type'] = 'application/json'
  res.body = JSON.generate({ 'ok' => true, 'root' => ROOT })
end

server.mount '/', WEBrick::HTTPServlet::FileHandler, PUBLIC_DIR, { FancyIndexing: false }

trap('INT') { server.shutdown }

puts "Course admin tool running at http://localhost:#{PORT}"
puts "Site root: #{ROOT}"
puts "Press Ctrl+C to stop."

server.start

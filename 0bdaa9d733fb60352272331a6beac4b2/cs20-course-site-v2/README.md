# CS20 2025-26 T2 P2 -- Course Site

This site was generated from a Canvas course export (`.imscc`) and converted to
Markdown + Jekyll for hosting on GitHub Pages.

## Structure

- `index.md` -- home page; the module list is generated automatically (see below)
- `modules/` -- one file per Canvas module. Each is just front matter (title,
  order, published) -- the actual list of items is built at *build time* by
  `_layouts/module.html`, so you never hand-edit a list of links.
- `pages/`, `assignments/`, `quizzes/`, `discussion_topics/` -- converted Canvas
  content. Quizzes include questions/answers pulled from the QTI export.
- `module_items/` -- lightweight entries for module items that aren't their own
  page: file attachments, external URLs, external tools, and module dividers.
- `files/` -- all media and attachments, organized in the same subfolders
  Canvas used (`web_resources/Images`, `web_resources/Uploaded Media`, etc.)
- `unfiled-items.md` -- content that existed in the export but wasn't placed
  in any module
- `_layouts/` -- the Liquid templates that build the module lists, home page,
  and unfiled-items page dynamically from all the front matter above

## Publish / unpublish, without touching any code

Every page, quiz, assignment, discussion, file link, and external link carries
a `published: true` or `published: false` line in its front matter, carried
over directly from Canvas's own publish state at export time.

**To hide something:** open its file, change `published: true` to
`published: false`, commit, and push. GitHub Pages rebuilds automatically.
Jekyll drops anything marked `published: false` from the build entirely --
no HTML is generated for it, and it disappears from its module's list and
from the home page (if you unpublish a whole module).

**To reveal something:** flip it back to `published: true`, commit, push.

That's the whole workflow -- no scripts, no rebuild tool, no AI needed for
routine hide/reveal changes. It's the same mechanism Jekyll and GitHub Pages
already use for drafts, so it's supported indefinitely by the platform itself.

One real difference from Canvas: Canvas enforces publish state per logged-in
user on the server. This is a static site with no login, so "unpublished"
means *the page doesn't exist in the built site* -- there's no way to have a
teacher-only view of the live site. Use the local draft preview below for that.

### Local draft preview (see unpublished items before you publish them)

```powershell
bundle install
bundle exec jekyll serve --unpublished --config _config.yml,_config_preview.yml
```

This builds *everything*, including `published: false` items, and adds a
"DRAFT" badge next to each one so you can review it before flipping it live.
Never deploy with `_config_preview.yml` -- it's local-only. A normal
`bundle exec jekyll serve` (or the real GitHub Pages build) always excludes
unpublished content, full stop.

## Publishing to GitHub Pages

1. Push this folder to a GitHub repository (the contents of this folder go at
   the repo root, not nested inside another folder).
2. In the repo, go to **Settings -> Pages** and set the source to the branch
   you pushed to.
3. GitHub builds the site automatically using Jekyll -- no local build needed
   for the live site to work.

## Running Jekyll locally (optional, for preview)

Requires Ruby + Bundler.

```powershell
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

This project's Gemfile intentionally uses plain modern Jekyll (`~> 4.3`)
rather than the `github-pages` gem. The `github-pages` gem pins an old
Jekyll/Liquid combo that crashes on modern Ruby (3.2+) with errors like
`cannot load such file -- csv` or `undefined method 'tainted?'` -- both are
the old gems calling APIs Ruby has since removed, not a problem with this
site's files. This has **no effect on the deployed site**: GitHub Pages
builds the live site on its own servers with its own pinned environment,
completely independent of your local Gemfile.

## Known issues carried over from the original course

A handful of files referenced in the original Canvas pages were missing from
the export itself (broken even in Canvas), so a few links point to files that
don't exist:

- `Python Quickstart.pptx` (referenced in "Overview of Review Topics")
- `Images/Lab03/RPS.pdf` (referenced in "Rock Paper Scissors")
- `Images/Lab02/Score_Display/Costumes.jpg`, `DigitDisplay.gif`, `modImage.jpg`
  (referenced in "Countdown with Sprites")

**Note:** quiz pages under `quizzes/` include correct answers (marked with
`[x]`) pulled from the QTI export. Since this is a public GitHub Pages site by
default, consider keeping the repo private, or unpublishing/editing quiz pages
before making the site public if students shouldn't see answer keys.

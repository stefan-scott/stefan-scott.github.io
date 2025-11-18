// Lightweight local editor behavior
(function(){
  const editor = document.getElementById('editor');
  const gutter = document.getElementById('gutter');
  const copyBtn = document.getElementById('copyBtn');
  const statusEl = document.getElementById('status');

  // Sync line numbers and scroll position
  function updateLineNumbers(){
    const lines = editor.value.split('\n').length;
    const maxWidth = String(lines).length;
    const lineNums = Array.from({length:lines}, (_, i) => String(i+1).padStart(maxWidth, ' ')).join('\n');
    gutter.textContent = lineNums;
  }

  function syncGutterScroll(){
    gutter.scrollTop = editor.scrollTop;
  }

  editor.addEventListener('input', updateLineNumbers);
  editor.addEventListener('scroll', syncGutterScroll);
  updateLineNumbers();

  function showStatus(msg, ms = 1500){
    statusEl.textContent = msg;
    if(ms>0){
      setTimeout(()=>{ if(statusEl.textContent === msg) statusEl.textContent = ''; }, ms);
    }
  }

  // Handle Tab and Shift+Tab for indentation / unindentation
  editor.addEventListener('keydown', function(e){
    if(e.key !== 'Tab') return;
    e.preventDefault();

    const start = this.selectionStart;
    const end = this.selectionEnd;
    const value = this.value;

    // If no multi-line selection, handle simple caret insert/remove
    if(start === end){
      if(e.shiftKey){
        // remove preceding tab or up to 4 spaces
        const before = value.slice(0,start);
        if(before.endsWith('\t')){
          this.value = value.slice(0,start-1) + value.slice(end);
          this.setSelectionRange(start-1,start-1);
        } else if(/ {1,4}$/.test(before)){
          const m = before.match(/ {1,4}$/)[0].length;
          this.value = value.slice(0,start-m) + value.slice(end);
          this.setSelectionRange(start-m,start-m);
        }
      } else {
        // insert 4 spaces
        this.value = value.slice(0,start) + '    ' + value.slice(end);
        this.setSelectionRange(start+4,start+4);
      }
      return;
    }

    // Multi-line: indent/unindent each line in selection
    const lineStart = value.lastIndexOf('\n', start-1) + 1;
    const lineEndIdx = value.indexOf('\n', end);
    const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
    const selected = value.slice(lineStart, lineEnd);
    const lines = selected.split('\n');

    if(e.shiftKey){
      // remove one leading 4-space indent or up to 4 spaces from each line
      const newLines = lines.map(l => {
        return l.replace(/^ {1,4}/,'');
      });
      const newSelected = newLines.join('\n');
      this.value = value.slice(0,lineStart) + newSelected + value.slice(lineEnd);
      const removed = selected.length - newSelected.length;
      this.setSelectionRange(start - Math.max(0, start - lineStart > 0 ? Math.min(1, start - lineStart) : 0), end - removed);
    } else {
      const newLines = lines.map(l => '    ' + l);
      const newSelected = newLines.join('\n');
      this.value = value.slice(0,lineStart) + newSelected + value.slice(lineEnd);
      const added = newSelected.length - selected.length;
      this.setSelectionRange(start + 1, end + added);
    }
  });

  // Copy button uses Clipboard API with execCommand fallback
  copyBtn.addEventListener('click', async function(){
    const text = editor.value;
    try{
      await navigator.clipboard.writeText(text);
      showStatus('Copied!');
    } catch(err){
      // fallback
      editor.select();
      try{
        const ok = document.execCommand('copy');
        showStatus(ok ? 'Copied!' : 'Copy failed');
        editor.setSelectionRange(0,0);
      } catch(e){
        showStatus('Copy failed');
      }
    }
  });

  // Prevent browser autocomplete / suggestions in case of some environments
  editor.setAttribute('autocomplete','off');

  // Initial focus
  editor.focus();
  syncGutterScroll();
})();
(function () {
  "use strict";

  var board = document.getElementById("board");
  var logEl = document.getElementById("log");
  var statusEl = document.getElementById("status");
  var itemsById = {}; // unique dom-row-id -> item object (mutated in place)
  var dragEl = null;

  function setStatus(text, cls) {
    statusEl.textContent = text;
    statusEl.className = "status" + (cls ? " " + cls : "");
  }

  function log(lines) {
    logEl.hidden = false;
    logEl.textContent = lines.join("\n");
    logEl.scrollTop = logEl.scrollHeight;
  }

  function rowId(prefix, idx) {
    return prefix + "-" + idx + "-" + Math.random().toString(36).slice(2, 8);
  }

  function makeItemRow(item) {
    var id = rowId("item", Object.keys(itemsById).length);
    itemsById[id] = item;

    var li = document.createElement("li");
    li.className = "item-row" + (item.is_divider ? " is-divider" : "");
    li.id = id;
    li.draggable = !item.is_divider;
    li.dataset.itemRow = "1";

    if (!item.is_divider) {
      var handle = document.createElement("span");
      handle.className = "drag-handle";
      handle.textContent = "☰";
      li.appendChild(handle);
    }

    var title = document.createElement("span");
    title.className = "item-title";
    title.textContent = item.nav_title || item.title;
    title.title = item.file;
    li.appendChild(title);

    if (!item.is_divider) {
      var kind = document.createElement("span");
      kind.className = "item-kind";
      kind.textContent = item.external ? "link" : item.kind.replace("_", " ");
      li.appendChild(kind);

      var label = document.createElement("label");
      label.className = "switch";
      label.title = "Published";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!item.published;
      cb.addEventListener("change", function () {
        itemsById[id].published = cb.checked;
      });
      var slider = document.createElement("span");
      slider.className = "slider";
      label.appendChild(cb);
      label.appendChild(slider);
      li.appendChild(label);
    }

    if (!item.is_divider) {
      li.addEventListener("dragstart", onDragStart);
      li.addEventListener("dragend", onDragEnd);
    }
    return li;
  }

  function makeModuleBox(mod, isUnfiled) {
    var box = document.createElement("section");
    box.className = "module-box" + (isUnfiled ? " unfiled-box" : "");
    box.dataset.moduleSlug = isUnfiled ? "__unfiled__" : mod.slug;

    var head = document.createElement("div");
    head.className = "module-box__head";

    var titleWrap = document.createElement("div");
    if (!isUnfiled) {
      var order = document.createElement("span");
      order.className = "module-box__order";
      order.textContent = "Module " + mod.order;
      titleWrap.appendChild(order);
    }
    var titleSpan = document.createElement("span");
    titleSpan.className = "module-box__title";
    titleSpan.textContent = isUnfiled ? "Unfiled items" : mod.title;
    titleWrap.appendChild(titleSpan);
    head.appendChild(titleWrap);

    if (!isUnfiled) {
      var label = document.createElement("label");
      label.className = "switch";
      label.title = "Module published";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = mod.published !== false;
      cb.addEventListener("change", function () {
        box.dataset.published = cb.checked ? "true" : "false";
      });
      box.dataset.published = String(mod.published !== false);
      var slider = document.createElement("span");
      slider.className = "slider";
      label.appendChild(cb);
      label.appendChild(slider);
      head.appendChild(label);
    }
    box.appendChild(head);

    var list = document.createElement("ul");
    list.className = "item-list";
    list.addEventListener("dragover", onListDragOver);
    list.addEventListener("dragleave", onListDragLeave);
    list.addEventListener("drop", onListDrop);
    var items = isUnfiled ? mod : mod.items;
    items.forEach(function (item) {
      list.appendChild(makeItemRow(item));
    });
    box.appendChild(list);

    if (!isUnfiled) box.dataset.moduleFile = mod.file;
    if (!isUnfiled) box.dataset.moduleTitle = mod.title;
    if (!isUnfiled) box.dataset.moduleOrder = mod.order;

    return box;
  }

  function render(data) {
    board.innerHTML = "";
    itemsById = {};
    data.modules.forEach(function (mod) {
      board.appendChild(makeModuleBox(mod, false));
    });
    board.appendChild(makeModuleBox(data.unfiled || [], true));
  }

  // ---- drag and drop (classic insertion-point reorder pattern) ----

  function onDragStart(e) {
    dragEl = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", dragEl.id); } catch (err) {}
    setTimeout(function () { dragEl.classList.add("dragging"); }, 0);
  }

  function onDragEnd() {
    if (dragEl) dragEl.classList.remove("dragging");
    dragEl = null;
    document.querySelectorAll(".item-list").forEach(function (l) { l.classList.remove("drag-over"); });
  }

  function onListDragOver(e) {
    e.preventDefault();
    if (!dragEl) return;
    var list = e.currentTarget;
    list.classList.add("drag-over");
    var after = getDragAfterElement(list, e.clientY);
    if (after == null) list.appendChild(dragEl);
    else list.insertBefore(dragEl, after);
  }

  function onListDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }

  function onListDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  }

  function getDragAfterElement(container, y) {
    var rows = Array.prototype.slice
      .call(container.querySelectorAll(".item-row:not(.dragging)"));
    var closest = { offset: -Infinity, element: null };
    rows.forEach(function (row) {
      var box = row.getBoundingClientRect();
      var offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        closest = { offset: offset, element: row };
      }
    });
    return closest.element;
  }

  // ---- collect current DOM state back into the API shape ----

  function collect() {
    var modules = [];
    var unfiled = [];
    board.querySelectorAll(".module-box").forEach(function (box) {
      var rows = Array.prototype.slice.call(box.querySelectorAll(".item-row"));
      var items = rows.map(function (row) { return itemsById[row.id]; });
      if (box.classList.contains("unfiled-box")) {
        unfiled = items;
      } else {
        modules.push({
          slug: box.dataset.moduleSlug,
          title: box.dataset.moduleTitle,
          order: parseInt(box.dataset.moduleOrder, 10),
          published: box.dataset.published === "true",
          file: box.dataset.moduleFile,
          items: items,
        });
      }
    });
    return { modules: modules, unfiled: unfiled };
  }

  // ---- API calls ----

  function loadStructure() {
    setStatus("Loading…");
    board.innerHTML = '<p class="loading">Loading course structure…</p>';
    return fetch("/api/structure")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        render(data);
        setStatus("Loaded");
      })
      .catch(function (err) {
        setStatus("Failed to load: " + err.message, "err");
      });
  }

  function saveStructure() {
    setStatus("Saving…");
    var payload = collect();
    return fetch("/api/structure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (result) {
        if (result.ok) {
          setStatus("Saved (" + result.changed_files.length + " file(s) updated)", "ok");
          log(result.changed_files.length
            ? ["Updated files:"].concat(result.changed_files)
            : ["No changes to save."]);
        } else {
          setStatus("Save failed", "err");
          log(["Error: " + result.error]);
        }
        return result;
      });
  }

  function publish() {
    return saveStructure().then(function (saveResult) {
      if (!saveResult.ok) return;
      setStatus("Publishing…");
      return fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Update course structure via admin tool" }),
      })
        .then(function (r) { return r.json(); })
        .then(function (result) {
          var lines = (result.log || []).map(function (entry) {
            return "$ " + entry.cmd + "\n" + (entry.stdout || "") + (entry.stderr || "");
          });
          log(lines);
          if (result.ok) {
            setStatus("Published to GitHub", "ok");
          } else {
            setStatus("Publish failed -- see log", "err");
          }
        });
    });
  }

  document.getElementById("btn-reload").addEventListener("click", loadStructure);
  document.getElementById("btn-save").addEventListener("click", saveStructure);
  document.getElementById("btn-publish").addEventListener("click", publish);

  loadStructure();
})();

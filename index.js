var pages = {
    "First Page": {
        id: "123456",
        title: "First Page",
        content: "Testing the first page",
        links: new Set()
    }
};

var currentPage;

function init() {
    loadFirstPage();
    populateFileSidebar();
    listenForTextChanges();
    listenForLinkClicks();
    listenForLineClicks();
    listenForSidebarToggle();
    listenForSidebarClicks();
}

function listenForSidebarToggle() {
    $('#sidebarCollapse').on('click', function () {
        $('#left-sidebar').toggleClass('active');
    });
}

function listenForSidebarClicks() {
    $(document).on("click", ".sidebar-link", function(e) {
        var pageTitle = e.target.text;
        load(pages[pageTitle]);
    });
}

function loadFirstPage() {
    load(pages["First Page"]);
}

function populateFileSidebar() {
    $("#file-list").html("");
    Object.keys(pages).forEach(function(pageTitle) {
        $("<a/>")
            .prop("href", "#")
            .addClass("list-group-item list-group-item-dark list-group-item-action sidebar-link")
            .text(pageTitle)
            .appendTo($("#file-list"));
    });
}

function save() {
    if (currentPage) {
        var currentInputText = $("#text").text();
        currentPage.content = currentInputText;
    }
}

function load(page) {
    currentPage = page;
    var html = "";
    page.content.split("\n").forEach(function(line) {
        html += "<div class='line'>" + line + "</div>";
    });
    var linkedHtml = linkBracketedText(html);
    $("#title").text(page.title);
    $("#text").html(linkedHtml);
    $("#links").html("");
    if (page.links.size) {
        $("#links").html(generateLinkFooterHtml(page));
    }
}

function generateLinkFooterHtml(page) {
    var links = Array.from(page.links);
    var html = `<b>${links.length} linked references to "${page.title}"</b>`;
    links.forEach(function(pageTitle) {
        html += `<p><span class="link">${pageTitle}</span></p>`;
    });
    return html;
}

function newPage(title) {
    title = title || getTempTitle();
    var newPage = {
        id: uuidv4(),
        title: title,
        content: "Start typing to add text",
        links: new Set()
    };
    pages[title] = newPage;
    populateFileSidebar();
    return newPage;
}

function getTempTitle() {
    var tempTitle;
    var tempTitleBase = "Untitled";
    var openTitleFound = false;
    var counter = 0;
    while (!openTitleFound) {
        if (counter === 0) {
            tempTitle = tempTitleBase;
        } else {
            tempTitle = tempTitleBase + "_" + counter;
        }
        if (tempTitle in pages) {
            counter++;
        } else {
            openTitleFound = true;
        }
    }
    return tempTitle;
}

function listenForTextChanges() {
    var lastCharWasOpenBracket = false;
    $(document).off("keydown").on("keydown", ".line-edit", function(e) {
        if (e.originalEvent.keyCode) {
            if (219 === e.originalEvent.keyCode) {
                if (lastCharWasOpenBracket) {
                    toggleLinkDialog(true);
                    lastCharWasOpenBracket = false;
                } else {
                    toggleLinkDialog(false);
                    lastCharWasOpenBracket = true;
                }
            } else if (13 === e.originalEvent.keyCode) {
                var $newLineTextArea = $("<textarea class='line-edit'/>")
                    .appendTo($(this).parent())
                    .css("min-height", 24)
                    .focus();
                $newLineTextArea.textareaAutoSize();
                return false;
            } else {
                lastCharWasOpenBracket = false;
            }
        }
    });
}

function listenForLinkClicks() {
    $(document).on("mousedown", ".link", function(e) {
        e.stopImmediatePropagation();
        var pageTitle = $(this).text().replace("[[", '').replace("]]", '');
        load(pages[pageTitle]);
    });
}

function listenForLineClicks() {
    $(document).on("mousedown", ".line", function(e) {
        var height = $(this).height();
        var $newTextArea = $("<textarea class='line-edit'>" + parseLinkOnFocus(this.innerHTML) + "</textarea>").replaceAll($(this));
        setTimeout(function() {
            $newTextArea.focus();
            $newTextArea.css("min-height", height)
            $newTextArea.textareaAutoSize();
            $newTextArea[0].setSelectionRange($newTextArea.val().trim().length, $newTextArea.val().trim().length);
        }, 0);
    });
    $(document).on("blur", ".line-edit", function(e) {
        var plainText = $(this).val();
        var parsedHtml = linkBracketedText(plainText);
        $(this)
            .replaceWith("<div class='line'>" + parsedHtml + "</div>")
        save();
    });
}

function parseLinkOnFocus(html) {
    var pat = /<span.*?>(.*?)<*.span>/g;
    var plainText = html.replace(pat, function(match, bracketedText) {
        return bracketedText;
    });
    return plainText;
}

function linkBracketedText(html) {
    var pat = /\[\[([^\[\]]*)\]\]/g;
    var linkedHtml = html.replace(pat, function(match, textInsideBrackets) {
        if (!(textInsideBrackets in pages)) {
            newPage(textInsideBrackets);
        }
        var page = pages[textInsideBrackets];
        page.links.add(currentPage.title);
        return `<span class='link'>${match}</span>`;
    });
    return linkedHtml;
}

function toggleLinkDialog(state) {
    $("#popup").toggle(state);
    if (state) {
        var end = $(".line-edit")[0].selectionEnd;
        insertAtCaret("]]");
        $(".line-edit")[0].selectionEnd = end;
        populateLinkDialog();
    }
}

function populateLinkDialog() {
    $(".popup-list").html("");
    Object.keys(pages).map(function(title) {
        $("<li/>")
            .addClass("popup-element")
            .text(title)
            .on("mousedown", function(e) { e.preventDefault(); })
            .click(fillLinkTitle.bind(null, title))
            .appendTo($(".popup-list"));
    });
}

function fillLinkTitle(title, event) {
    event.preventDefault();
    insertAtCaret(title);
    toggleLinkDialog(false);
}

function insertAtCaret(text) {
  var txtarea = $(".line-edit")[0];
  if (!txtarea) {
    return;
  }

  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false));
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  } else if (br == "ff") {
    strPos = txtarea.selectionStart;
  }

  var front = (txtarea.value).substring(0, strPos);
  var back = (txtarea.value).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var ieRange = document.selection.createRange();
    ieRange.moveStart('character', -txtarea.value.length);
    ieRange.moveStart('character', strPos);
    ieRange.moveEnd('character', 0);
    ieRange.select();
  } else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }

  txtarea.scrollTop = scrollPos;
}

function uuidv4() {
  var uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  return uuid.substring(uuid.length - 7, uuid.length - 1);
}

$(function () {
    init();
});
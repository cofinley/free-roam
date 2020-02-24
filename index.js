(function() {
    window.fr = {};
})();

function init() {
    loadFirstPage();
    populateFileSidebar();
    listenForTextChanges();
    listenForLinkClicks();
    listenForLineClicks();
    listenForSidebarToggle();
    listenForSidebarClicks();
}

function loadFirstPage() {
    fr.page.load("First Page");
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

$(function () {
    // init();
});
function init() {
    var fr = window.fr;

    loadFirstPage();
    fr.leftSidebar.init();
    fr.rightSidebar.init();
    fr.autocomplete.init();
    fr.editor.init();
}

function loadFirstPage() {
    fr.page.load("First Page");
}

$(function () {
    init();
});
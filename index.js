function init() {
    var fr = window.fr;

    loadFirstPage();
    fr.leftSidebar.init();
    fr.editor.init();
}

function loadFirstPage() {
    fr.page.load("First Page");
}

$(function () {
    init();
});
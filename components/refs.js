(function() {
    "use strict";
    var fr = window.fr;

    fr.refs = {

        generateLinked: function(page) {
            var links = Array.from(page.links);
            var html = `<b>${links.length} linked references to "${page.title}"</b>`;
            links.forEach(function(pageTitle) {
                html += `<p><span class="link">${pageTitle}</span></p>`;
            });
            return html;
        },

        generateUnlinked: function(page) {
            var unlikedPageTitles = fr.page.searchForUnlinkedRefs(page.title);
            var html = `<b>${unlikedPageTitles.length} unlinked references to "${page.title}"</b>`;
            unlikedPageTitles.forEach(function(pageTitle) {
                html += `<p><span class="link">${pageTitle}</span></p>`;
            });
            return html;
        }
    };
})();
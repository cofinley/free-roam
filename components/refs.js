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
        }
    };
})();
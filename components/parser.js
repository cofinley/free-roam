(function() {
    "use strict";
    var fr = window.fr;

    fr.parser = {
        parseHtml: function(html) {
            var pat = /<span.*?>(.*?)<*.span>/g;
            var plainText = html.replace(pat, function(match, bracketedText) {
                return bracketedText;
            });
            return plainText;
        },

        renderHtml: function(html) {
            var pat = /\[\[([^\[\]]*)\]\]/g;
            var linkedHtml = html.replace(pat, function(match, textInsideBrackets) {
                if (!(textInsideBrackets in fr.page.pages)) {
                    fr.page.new(textInsideBrackets);
                }
                var page = fr.page.pages[textInsideBrackets];
                page.links.add(fr.page.current.title);
                return `<span class='link'>${match}</span>`;
            });
            return linkedHtml;
        }
    };
})();
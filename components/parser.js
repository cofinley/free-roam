(function() {
    "use strict";
    var fr = window.fr;

    fr.parser = {

        parseHtml: function(html) {
            html = this.parseLinks(html);
            html = this.parseTabs(html);
            html = this.parseBold(html);
            html = this.parseItalics(html);
            var plainText = html;
            return plainText;
        },

        parseLinks: function(html) {
            var pat = /<span.*?>([^<]*)<\/span>/g;
            return html.replace(pat, function(match, bracketedText) {
                return bracketedText;
            });
        },

        parseTabs: function(html) {
            return html.replace("&emsp;&emsp;", "\t");
        },

        parseBold: function(html) {
            var pat = /<b\b.*?>([^<]*)<\/b>/g;
            return html.replace(pat, function(match, boldText) {
                return `**${boldText}**`;
            });
        },

        parseItalics: function(html) {
            var pat = /<i\b.*?>([^<]*)<\/i>/g;
            return html.replace(pat, function(match, italicText) {
                return `_${italicText}_`;
            });
        },

        renderPlainText: function(plainText) {
            plainText = this.renderLinks(plainText);
            plainText = this.renderTabs(plainText);
            plainText = this.renderBold(plainText);
            plainText = this.renderItalics(plainText);
            var html = plainText;
            return html;
        },

        renderLinks: function(plainText) {
            var pat = /\[\[([^\[\]]*)\]\]/g;
            return plainText.replace(pat, function(match, textInsideBrackets) {
                if (!(textInsideBrackets in fr.page.pages)) {
                    fr.page.new(textInsideBrackets);
                }
                var page = fr.page.pages[textInsideBrackets];
                page.links.add(fr.page.current.title);
                return `<span class='${fr.editor.linkClass}'>${match}</span>`;
            });
        },

        renderItalics: function(plainText) {
            var pat = /_([^_]*)_/g;
            return plainText.replace(pat, function(match, italicText) {
                return `<i>${italicText}</i>`;
            });
        },
        renderBold: function(plainText) {
            var pat = /\*\*([^\*]*)\*\*/g;
            return plainText.replace(pat, function(match, boldText) {
                return `<b>${boldText}</b>`;
            });
        },

        renderTabs: function(plainText) {
            return plainText.replace("\t", "&emsp;&emsp;");
        },

        renderLine: function(plainTextLine, readOnly) {
            var lineClass = readOnly ? fr.editor.readOnlyClass : fr.editor.renderedClass;
            return `<div class="${lineClass}">${this.renderPlainText(plainTextLine)}</div>`;
        }
    };
})();
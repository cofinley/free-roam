(function() {
    "use strict";
    var fr = window.fr;

    fr.editor = {
        keyCodes: {
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            ENTER: 13
        },

        renderedClass: "line",
        renderedSelector: ".line",
        editClass: "line-edit",
        editSelector: ".line-edit",
        linkSelector: ".link",

        init: function() {
            this.watchTextChanges();
            this.watchClicks();
            this.watchBlurs();
        },

        watchTextChanges: function() {
            var lastCharWasOpenBracket = false;
            var self = this;
            $(document).off("keydown").on("keydown", this.editSelector, function(e) {
                if (e.originalEvent.keyCode) {
                    if (self.keyCodes.LEFT_BRACKET === e.originalEvent.keyCode) {
                        if (lastCharWasOpenBracket) {
                            fr.autocomplete.toggleLinkDialog(true);
                            lastCharWasOpenBracket = false;
                        } else {
                            fr.autocomplete.toggleLinkDialog(false);
                            lastCharWasOpenBracket = true;
                        }
                    } else if (self.keyCodes.ENTER === e.originalEvent.keyCode) {
                        var $newLineTextArea = self.createNewEditor()
                            .appendTo($(this).parent())
                            .focus();
                        $newLineTextArea.textareaAutoSize();
                        return false;
                    } else {
                        lastCharWasOpenBracket = false;
                    }
                }
            });
        },

        watchClicks: function() {
            this.watchFocusClicks();
            this.watchLinkClicks();
        },

        createNewEditor: function() {
            return $("<textarea/>")
                .addClass(this.editClass)
                .css("min-height", 24);
        },

        switchToEditor: function(nodeToEdit, height) {
            var $textArea = this.createNewEditor()
                .replaceAll($(nodeToEdit));

            var value = fr.parser.parseLinkOnFocus(nodeToEdit.innerHTML.trim());
            $textArea.val(value);

            setTimeout(function() {
                $textArea.focus();
                $textArea.textareaAutoSize();

                if (undefined !== height) {
                    $textArea.height(height);
                }

                var end = $textArea.val().trim().length;
                $textArea[0].setSelectionRange(end, end);
            }, 0);
        },

        switchToRendered: function(nodeToRender) {
            var plainText = $(nodeToRender).val();
            var parsedHtml = fr.parser.linkBracketedText(plainText);
            $(nodeToRender).replaceWith(`<div class='${this.renderedClass}'>` + parsedHtml + "</div>")
            fr.page.save();
        },

        watchFocusClicks: function() {
            var self = this;
            $(document).on("mousedown", this.renderedSelector, function(e) {
                var height = $(this).height();
               self.switchToEditor(this, height);
            });
        },

        watchLinkClicks: function() {
            $(document).on("mousedown", this.linkSelector, function(e) {
                e.stopImmediatePropagation();
                var pageTitle = $(this).text().replace("[[", '').replace("]]", '');
                fr.page.load(pageTitle);
            });
        },

        watchBlurs: function() {
            var self = this;
            $(document).on("blur", this.editSelector, function(e) {
                self.switchToRendered(this);
            });
        }
    };
})();
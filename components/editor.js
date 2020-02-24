(function() {
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

        init: function() {
            this.watchTextChanges();
            this.watchClicks();
            this.watchBlurs();
        },

        watchTextChanges: function() {
            var lastCharWasOpenBracket = false;
            var self = this;
            $(document).off("keydown").on("keydown", ".line-edit", function(e) {
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
                        var $newLineTextArea = $("<textarea/>")
                            .addClass("line-edit")
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
        },

        watchClicks: function() {
            this.watchFocusClicks();
            this.watchLinkClicks();
        },

        watchFocusClicks: function() {
            $(document).on("mousedown", ".line", function(e) {
                var height = $(this).height();
                var $newTextArea = $("<textarea class='line-edit'>" + fr.parser.parseLinkOnFocus(this.innerHTML.trim()) + "</textarea>").replaceAll($(this));
                setTimeout(function() {
                    $newTextArea.focus();
                    $newTextArea.textareaAutoSize();
                    $newTextArea.css("height", height)
                    $newTextArea[0].setSelectionRange($newTextArea.val().trim().length, $newTextArea.val().trim().length);
                }, 0);
            });
        },

        watchLinkClicks: function() {
            $(document).on("mousedown", ".link", function(e) {
                e.stopImmediatePropagation();
                var pageTitle = $(this).text().replace("[[", '').replace("]]", '');
                fr.page.load(pageTitle);
            });
        },

        watchBlurs: function() {
            $(document).on("blur", ".line-edit", function(e) {
                var plainText = $(this).val();
                var parsedHtml = fr.parser.linkBracketedText(plainText);
                $(this).replaceWith("<div class='line'>" + parsedHtml + "</div>")
                fr.page.save();
            });
        }
    };
})();
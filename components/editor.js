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
            ARROWS: [37, 38, 39, 40],
            ENTER: 13
        },

        lastCharWasOpenBracket: false,

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
            var self = this;
            $(document).off("keydown").on("keydown", this.editSelector, function(e) {
                return self.handleKeyDown(e);
            });
        },

        handleKeyDown: function(e) {
            if (e.originalEvent.keyCode) {
                var key = e.originalEvent.keyCode;
                if (this.keyCodes.ENTER === key) {
                    this.handleEnterKey(e.target);
                    return false;
                }
                if (this.keyCodes.LEFT_BRACKET === key)
                    this.handleAutocomplete();
                else if (this.keyCodes.ARROWS.includes(key)) {
                    return this.handleArrowKeys(key, e);
                }
            }
            return true;
        },

        handleAutocomplete: function() {
            if (this.lastCharWasOpenBracket) {
                fr.autocomplete.toggleLinkDialog(true);
                this.lastCharWasOpenBracket = false;
            } else {
                fr.autocomplete.toggleLinkDialog(false);
                this.lastCharWasOpenBracket = true;
            }
        },

        handleEnterKey: function(node) {
            this.createNewEditor()
                .appendTo($(node).parent())
                .focus()
                .textareaAutoSize();
        },

        handleArrowKeys: function(key, e) {
            var self = this;
            var node = e.target;
            var currentEditorLines = fr.utils.getLines($(node));
            var currentCaretPos = node.selectionEnd;
            var currentLineInfo = fr.utils.getCurrentLineInfo(currentCaretPos, currentEditorLines);
            switch (key) {
                case self.keyCodes.UP_ARROW:
                    if (0 === currentLineInfo.lineIndex) {
                        // Move up to the previous node if there is one, maintain current caret position
                        var $prevNode = $(node).prev(self.renderedSelector);
                        if ($prevNode.length) {
                            var startingCaretLeftCoordinate = getCaretCoordinates(node, currentCaretPos).left;
                            var editorLines = fr.utils.getLines($prevNode);
                            var lineToFocus = editorLines[editorLines.length - 1];
                            var lengthUpToLastLine = editorLines.slice(0, editorLines.length - 1).join(" ").length + 1;
                            var caretPosition = Math.min(lengthUpToLastLine + currentCaretPos, lengthUpToLastLine + lineToFocus.length);
                            self.switchToEditor($prevNode[0], caretPosition, startingCaretLeftCoordinate);
                            return false;
                        }
                        return true;
                    }
                    break;
                case self.keyCodes.DOWN_ARROW:
                    if (currentEditorLines.length - 1 === currentLineInfo.lineIndex) {
                        // Move down if possible, maintain current caret position
                        var $nextNode = $(node).next(self.renderedSelector);
                        if ($nextNode.length) {
                            var startingCaretLeftCoordinate = getCaretCoordinates(node, currentCaretPos).left;
                            var editorLines = fr.utils.getLines($nextNode);
                            var lineToFocus = editorLines[0];
                            var caretPosition = Math.min(currentLineInfo.relativeCaretPos, lineToFocus.length);
                            self.switchToEditor($nextNode[0], caretPosition, startingCaretLeftCoordinate);
                            return false;
                        }
                        return true;
                    }
                    break;
                case self.keyCodes.RIGHT_ARROW:
                    if ($(node).val().trim().length === currentCaretPos) {
                        // Move down if possible, move caret to beginning
                        var $nextNode = $(node).next(self.renderedSelector);
                        if ($nextNode.length) {
                            self.switchToEditor($nextNode[0], 0);
                        }
                    }
                    break;
                case self.keyCodes.LEFT_ARROW:
                    if (0 === currentCaretPos) {
                        // Move up if possible, move to caret to end
                        var $prevNode = $(node).prev(self.renderedSelector);
                        if ($prevNode.length) {
                            self.switchToEditor($prevNode[0], $prevNode.text().trim().length);
                        }
                    }
                    break;
                default:
                    break;
            }
            return true;
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

        switchToEditor: function(nodeToEdit, caretPosition, previousCaretLeftCoordinate) {
            var self = this;
            var height = $(nodeToEdit).height();
            var width = $(nodeToEdit).width();
            var $textArea = this.createNewEditor()
                .width(width);

            var $temp = $("<div/>")
                .css({
                    "position": "absolute",
                    "left": "-9999px",
                })
                .appendTo(body)
                .append($textArea);

            var value = fr.parser.parseLinkOnFocus(nodeToEdit.innerHTML.trim());
            $textArea.val(value);

            setTimeout(function() {
                $textArea.textareaAutoSize();
                $textArea.height(height);

                caretPosition = undefined !== caretPosition ? caretPosition : $textArea.val().trim().length;
                if (previousCaretLeftCoordinate) {
                    var newCaretLeftCoordinate = getCaretCoordinates($textArea[0], caretPosition).left;
                    var caretOffset = this.fineTuneCaretPosition(previousCaretLeftCoordinate, newCaretLeftCoordinate, caretPosition, $textArea[0]);
                    caretPosition += caretOffset;
                }
                $textArea[0].setSelectionRange(caretPosition, caretPosition);
                $textArea.replaceAll($(nodeToEdit));
                $textArea.focus();
                $temp.remove();
            }.bind(this), 0);
        },

        fineTuneCaretPosition: function(prevLeft, newLeft, currCaretPos, node) {
            var range = 5;
            var minDiff = Math.abs(prevLeft - newLeft);
            var currCaretOffset = 0;

            for (var offset = -range; offset <= range; offset++) {
                var left = getCaretCoordinates(node, currCaretPos + offset).left;
                var diff = Math.abs(prevLeft - left);
                if (diff < minDiff) {
                    minDiff = diff;
                    currCaretOffset = offset;
                }
            }
            return currCaretOffset;
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
               self.switchToEditor(e.target);
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
                self.switchToRendered(e.target);
            });
        }
    };
})();
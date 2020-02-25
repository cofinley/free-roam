(function() {
    "use strict";
    var fr = window.fr;

    fr.utils = {
        insertAtCaret: function(txtarea, text) {
            if (!txtarea) {
                return;
            }

            var scrollPos = txtarea.scrollTop;
            var strPos = 0;
            var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                "ff" : (document.selection ? "ie" : false));
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart('character', -txtarea.value.length);
                strPos = range.text.length;
            } else if (br == "ff") {
                strPos = txtarea.selectionStart;
            }

            var front = (txtarea.value).substring(0, strPos);
            var back = (txtarea.value).substring(strPos, txtarea.value.length);
            txtarea.value = front + text + back;
            strPos = strPos + text.length;
            if (br == "ie") {
                txtarea.focus();
                var ieRange = document.selection.createRange();
                ieRange.moveStart('character', -txtarea.value.length);
                ieRange.moveStart('character', strPos);
                ieRange.moveEnd('character', 0);
                ieRange.select();
            } else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
            }

            txtarea.scrollTop = scrollPos;
        },

        uuidv4: function() {
            var uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
            return uuid.substring(uuid.length - 7, uuid.length - 1);
        },

        getTextWidth: function($node) {
            // if given, use cached canvas for better performance
            // else, create new canvas
            var text = "TEXTAREA" === $node[0].nodeName ? $node.val() : $node.text();
            var font = $node.css("font-size") + " " + $node.css("font-family");
            var canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
            var context = canvas.getContext("2d");
            context.font = font;
            var metrics = context.measureText(text);
            return metrics.width;
        },

        getWrappedLines: function($node) {
            var text = "TEXTAREA" === $node[0].nodeName ? $node.val() : $node.text();
            var numLines = Math.ceil(this.getTextWidth($node) / $node.width());
            var numCharsPerLine = text.length / numLines;
            var lines = text.split(
                new RegExp(`(?![^\\n]{1,${numCharsPerLine}}$)([^\\n]{1,${numCharsPerLine}})\\s`, 'g')
            )
            if (lines.length > 1 && lines[0] === "") {
                return lines.splice(1);
            } else {
                return lines;
            }
        },

        getCurrentLineIndex: function(caretPosition, lines) {
            var totalTextOffset = 0;
            for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                var currentLine = lines[lineIndex];
                var currentLineLength = currentLine.length;
                var currentLineUpperBoundOffset = totalTextOffset + currentLineLength;
                if (totalTextOffset <= caretPosition && caretPosition <= currentLineUpperBoundOffset) {
                    return lineIndex;
                }
                totalTextOffset = currentLineUpperBoundOffset;
            }
            return -1;
        }
    };
})();
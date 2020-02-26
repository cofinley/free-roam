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
            var numCharsPerLine = Math.floor(text.length / numLines);
            var lines = text.split(
                new RegExp(`(?![^\\n]{1,${numCharsPerLine}}$)([^\\n]{1,${numCharsPerLine}})\\s`, 'g')
            )
            return lines.filter(function(line) {
                return "" !== line;
            });
        },

        getLines: function($node) {
            var clone = $node[0].cloneNode(true);
            if ("TEXTAREA" === clone.nodeName) {
                var plainText = $(clone).val();
                var parsedHtml = fr.parser.renderLine(plainText);
                clone = $(parsedHtml)[0];
            }
            var temp = $("<div/>")
                .css({
                    "position": "absolute",
                    "left": "-9999px",
                })
                .appendTo(body)
                .append(clone);
            $(clone).width($node.width());

            var current = clone;
            var text = $(current).text();
            var words = text.split(' ');
            current.innerHTML = words[0];
            var height = current.offsetHeight;
            var lines = [];
            var list = [words[0]];
            for(var i = 1; i < words.length; i++){
                current.innerHTML += ' ' + words[i];
                if(current.offsetHeight > height){
                    height = current.offsetHeight;
                    lines.push(list.join(" "));
                    list = [];
                }
                list.push(words[i]);
            }
            lines.push(list.join(" "));
            temp.remove();
            return lines;
        },

        getCurrentLineInfo: function(caretPosition, lines) {
            var totalTextOffset = 0;
            var currentLine;
            var currentLineLength;
            var currentLineUpperBoundOffset;
            for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                currentLine = lines[lineIndex];
                currentLineLength = currentLine.length;
                currentLineUpperBoundOffset = totalTextOffset + currentLineLength;
                if (totalTextOffset <= caretPosition && caretPosition <= currentLineUpperBoundOffset) {
                    return {
                        relativeCaretPos: caretPosition - totalTextOffset,
                        lineIndex: lineIndex
                    };
                }
                totalTextOffset = currentLineUpperBoundOffset;
            }
            return {
                relativeCaretPos: currentLineLength,
                lineIndex: lines.length - 1
            };
        }
    };
})();
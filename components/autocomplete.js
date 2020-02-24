(function() {
    "use strict";
    var fr = window.fr;

    fr.autocomplete = {

        toggleLinkDialog: function (state) {
            $("#popup").toggle(state);
            if (state) {
                var textarea = $(".line-edit")[0];
                var end = textarea.selectionEnd;
                fr.utils.insertAtCaret(textarea, "]]");
                $(".line-edit")[0].selectionEnd = end;
                this.populateLinkDialog();
            }
        },

        populateLinkDialog: function () {
            var self = this;
            $(".popup-list").html("");
            Object.keys(fr.page.pages).map(function(title) {
                $("<li/>")
                    .addClass("popup-element")
                    .text(title)
                    .on("mousedown", function(e) { e.preventDefault(); })
                    .click(self.fillLinkTitle.bind(self, title))
                    .appendTo($(".popup-list"));
            });
        },

        fillLinkTitle: function (title, event) {
            event.preventDefault();
            var textarea = $(".line-edit")[0];
            fr.utils.insertAtCaret(textarea, title);
            this.toggleLinkDialog(false);
        }
    }
})();
(function() {
    "use strict";
    var fr = window.fr;

    fr.autocomplete = {

        listener: null,

        init: function() {
            var self = this;
            this.listener = new Tribute({
                trigger: "[[",
                values: self.getValues(),
                selectTemplate: function (item) {
                    return "[[" + item.original.value + "]]";
                },
                allowSpaces: true
            });
        },

        getValues: function() {
            return fr.page.getPageTitles().map(function(title) {
                return {
                    "key": title,
                    "value": title
                };
            });
        }
    }
})();
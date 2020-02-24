(function() {
    var fr = window.fr;

    fr.leftSidebar = {
        init: function() {
            this.populate();
            this.watchFileClick();
        },

        watchFileClick: function() {
            $(document).on("click", ".sidebar-link", function(e) {
                var pageTitle = e.target.text;
                fr.page.load(pageTitle);
            });
        },

        populate: function() {
            $("#file-list").html("");
            Object.keys(fr.page.pages).forEach(function(pageTitle) {
                $("<a/>")
                    .prop("href", "#")
                    .addClass("list-group-item list-group-item-action sidebar-link")
                    .text(pageTitle)
                    .appendTo($("#file-list"));
            });
        }
    };
})();
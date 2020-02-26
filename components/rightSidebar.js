(function() {
    "use strict";
    var fr = window.fr;

    fr.rightSidebar = {
        pagesOpen: [],
        toggleClass: "sidebar-page-toggle",
        toggleSelector: ".sidebar-page-toggle",
        closeClass: "sidebar-page-close",
        closeSelector: ".sidebar-page-close",
        refClass: "sidebar-page-ref-button",
        refSelector: ".sidebar-page-ref-button",

        init: function() {
            this.watchToggles();
            this.watchClosings();
            this.watchRefsClick();
        },

        openPage: function(pageTitle) {
            var page = fr.page.pages[pageTitle];
            this.pagesOpen.push(page);
            var html = fr.page.generateHtml(page);
            var $header = $("<div/>")
                .addClass("sidebar-page-header");
            $("<span/>")
                .addClass(this.toggleClass)
                .text("-")
                .appendTo($header);
            $("<h3/>")
                .addClass("sidebar-page-title")
                .html(`<a href="#" class="link">${pageTitle}</a>`)
                .appendTo($header);
            $("<button/>")
                .addClass("sidebar-page-ref-button btn badge badge-light")
                .text(page.links.size)
                .appendTo($header);
            $("<button/>")
                .addClass("sidebar-page-close close")
                .html('<span aria-hidden="true">&times;</span>')
                .appendTo($header);

            var $content = $("<div/>")
                .addClass("sidebar-page-content")
                .html(html);

            var $block = $("<div/>")
                .addClass("sidebar-page-block")
                .data("page", page)
                .append($header)
                .append($content);

            $("#right-sidebar")
                .prepend($block)
                .show();
        },

        openReferences: function(page) {
            var referencesHtml = fr.refs.generateLinked(page);
            var $header = $("<div/>")
                .addClass("sidebar-page-header");
            $("<span/>")
                .addClass(this.toggleClass)
                .text("-")
                .appendTo($header);
            $("<h5/>")
                .addClass("sidebar-page-title")
                .text(`Linked References to ${page.title}`)
                .appendTo($header);
            $("<button/>")
                .addClass("sidebar-page-close close")
                .html('<span aria-hidden="true">&times;</span>')
                .appendTo($header);

            var $content = $("<div/>")
                .addClass("sidebar-page-content")
                .html(referencesHtml);

            var $block = $("<div/>")
                .addClass("sidebar-page-block")
                .append($header)
                .append($content);

            $("#right-sidebar")
                .prepend($block)
                .show();
        },

        watchToggles: function() {
            $(document).on("click.sidebarToggle", this.toggleSelector, function(e) {
                if ("-" === $(this).text()) {
                    $(this).text("+");
                } else {
                    $(this).text("-");
                }
                $(this).parents(".sidebar-page-block").children(".sidebar-page-content").toggle();
            });
        },

        watchClosings: function() {
            $(document).on("click.sidebarBlockClose", this.closeSelector, function(e) {
                var onlyBlockOpen = 1 === $(this).parents("#right-sidebar").children(".sidebar-page-block").length;
                $(this).parents(".sidebar-page-block").remove();
                if (onlyBlockOpen) {
                    $("#right-sidebar").hide();
                }
            });
        },

        watchRefsClick: function() {
            var self = this;
            $(document).on("click.sidebarRefClick", this.refSelector, function(e) {
                var page = $(this).parents(".sidebar-page-block").data("page");
                self.openReferences(page);
            });
        }
    };
})();
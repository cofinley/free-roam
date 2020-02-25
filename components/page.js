(function() {
    "use strict";
    var fr = window.fr;

    fr.page = {
        pages: {
            "First Page": {
                id: "123456",
                title: "First Page",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                links: new Set()
            }
        },

        current: null,

        load: function(pageTitle) {
            var page = this.pages[pageTitle];
            this.current = page;
            var html = "";
            page.content.split("\n").forEach(function(line) {
                html += "<div class='line'>" + line + "</div>";
            });
            var linkedHtml = fr.parser.linkBracketedText(html);
            $("#title").text(page.title);
            $("#text").html(linkedHtml);
            $("#links").html("");
            if (page.links.size) {
                $("#links").html(fr.refs.generateLinked(page));
            }
        },

        save: function() {
            if (this.current) {
                var currentInputText = $("#text").text();
                this.current.content = currentInputText;
            }
        },

        new: function(title) {
            title = title || this.generateTitle();
            var newPage = {
                id: fr.utils.uuidv4(),
                title: title,
                content: "Start typing to add text",
                links: new Set()
            };
            this.pages[title] = newPage;
            fr.leftSidebar.populate();
            return newPage;
        },

        generateTitle: function() {
            var tempTitle;
            var tempTitleBase = "Untitled";
            var openTitleFound = false;
            var counter = 0;
            while (!openTitleFound) {
                if (counter === 0) {
                    tempTitle = tempTitleBase;
                } else {
                    tempTitle = tempTitleBase + "_" + counter;
                }
                if (tempTitle in this.pages) {
                    counter++;
                } else {
                    openTitleFound = true;
                }
            }
            return tempTitle;
        }
    };
})();
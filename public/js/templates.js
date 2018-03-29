(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header.hb.html'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header>\n    <ul id=\"dropdown1\" class=\"dropdown-content\">\n       <!-- <li><a href=\"#!\">Account</a></li>\n        <li class=\"divider\"></li>\n        <li><a href=\"#!\">Resources</a></li>\n        <li class=\"divider\"></li> -->\n        <li><a onclick=\"signOut()\">Sign Out</a></li>\n    </ul>\n    <!-- Nav Bar will be designed here -->\n    <nav class=\"navbar-material\">\n        <div class=\"nav-wrapper brown darken-2\">\n            <a href=\"index.html\" class=\"brand-logo\"><img class=\"responsive-img\" id=\"logo\" src=\"pictures/lehigh_logo.png\"/></a>\n            <ul class=\"right hide-on-med-and-down\">\n                <li><a id=\"homeButton\" class=\"waves-effect btn-flat\"><i class=\"material-icons white-text\">home</i></a>\n                </li>\n                <li><a class=\"dropdown-button\" href=\"#!\" data-activates=\"dropdown1\"><i\n                        class=\"material-icons\">menu</i></a></li>\n            </ul>\n        </div>\n    </nav>\n</header>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['footer.hb.html'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<footer class=\"page-footer brown darken-2\">\n    <div class=\"container\">\n        <h6 class=\"grey-text text-lighten-4 left\">Copyright 2017 Copyright</h6>\n        <h6 class=\"grey-text text-lighten-4 right\">2017 CSB Capstone Project</h6>\n    </div>\n</footer>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['progress-dialog.hb.html'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"progress-dialog\" class=\"modal\">\n    <div class=\"modal-content center-align\">\n        <div class=\"preloader-wrapper big active\">\n            <div class=\"spinner-layer spinner-blue-only\">\n                <div class=\"circle-clipper left\">\n                    <div class=\"circle\"></div>\n                </div>\n                <div class=\"gap-patch\">\n                    <div class=\"circle\"></div>\n                </div>\n                <div class=\"circle-clipper right\">\n                    <div class=\"circle\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();

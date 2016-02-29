require("angular");

const app = angular.module('app', []);

require("./service")(app);
require("./directives/chat")(app);
require("./screen")(app);

'use strict';
var Marionette = require('backbone.marionette');

// Replace the Marionette renderer with this Handlebars capable one.
Marionette.Renderer.render = function (template, data) {
  return template(data);
};

define(['underscore', 'backbone', 'marionette'], function (_, Backbone) {
	'use strict';

  var oldRender = Backbone.Marionette.Renderer.render;
	
	// Replace the Marionette renderer with this Handlebars capable one.
	Backbone.Marionette.Renderer.render = function (template, data) {
    return _.isFunction(template) ? template(data) : oldRender(template, data);
  };

});
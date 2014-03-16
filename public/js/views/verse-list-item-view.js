define(['handlebars', 'marionette', 'hbs!templates/verse-list-item'], function (Handlebars, Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({

	  tagName: 'li',

	  template: template

	});

});
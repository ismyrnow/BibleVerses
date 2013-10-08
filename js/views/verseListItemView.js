define(['handlebars', 'marionette', 'hbs!templates/verselistitem'], function (Handlebars, Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({

	  tagName: 'li',

	  template: template

	});

});
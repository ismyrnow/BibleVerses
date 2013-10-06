define(['handlebars', 'marionette'], function (Handlebars, Marionette) {
  'use strict';

  return Marionette.ItemView.extend({

	  tagName: 'li',

	  template: Handlebars.compile($('#verse-list-item').html())

	});

});
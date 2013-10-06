define(['backbone', 'handlebars'], function (Backbone, Handlebars) {
  'use strict';

  return Backbone.View.extend({

	  tagName: 'li',

	  template: Handlebars.compile($('#verse-list-item').html()),

	  render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	  }

	});

});
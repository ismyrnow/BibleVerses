/*global App */
'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.VerseList = Backbone.View.extend({

  template: Handlebars.compile($('#verse-list').html()),

  initialize: function() {

  	this.list = this.model.attributes.list;
  	this.verses = new App.Collections.Verses;
    this.verses.fetch();

  },

  addOne: function(model) {

    var view = new App.Views.VerseListItem({ model: model });
    this.$('.verses').append(view.render().el);

  },

  addAll: function() {

  	var verses = this.list ?
  		this.verses.where({ list: this.list }) :
  		this.verses.models;

  	_.each(verses, this.addOne, this);

  },

  updateListNav: function() {

  	var list = this.list;

  	if (!list) {
  		this.$('footer nav a:first-child').addClass('active');
  	}

  	this.$('footer nav a').each(function(i, el) {
  		var $el = $(el);
  		if ($el.data('list') === list) {
  			$el.addClass('active');
			}
  	});

  },

  render: function() {

    this.$el.html(this.template(this.model.toJSON()));
    this.addAll();
    this.updateListNav();

    return this;

  }

});
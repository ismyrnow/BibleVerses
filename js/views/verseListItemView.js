/*global App */
'use strict';

var App = App || {};

App.VerseListItemView = Backbone.View.extend({

  tagName: 'li',

  template: Handlebars.compile($('#verse-list-item').html()),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
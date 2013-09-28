/*global App */
'use strict';

var App = App || {};

App.VerseView = Backbone.View.extend({

  tagName: 'li',

  template: Handlebars.compile($('#verse').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
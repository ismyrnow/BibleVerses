/*global App */

var App = App || {};

App.AppView = Backbone.View.extend({

  el: $('body'),

  initialize: function() {

    this.listenTo(App.Verses, 'add', this.addOne);
    this.listenTo(App.Verses, 'reset', this.addAll);

    App.Verses.fetch();

  },

  addOne: function(model) {
    var view = new App.VerseView({ model: model });
    this.$(".verses").append(view.render().el);
  },

  addAll: function() {
  	App.Verses.each(this.addOne, this);
  }

});

App.App = new App.AppView;
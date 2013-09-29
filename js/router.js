/*globals App */

var App = App || {};

App.Router = Backbone.Router.extend({

  routes: {
    'verses':               'allVerses',
    'verses/learning':      'learningVerses',
    'verses/memorized':     'memorizedVerses',
    'verses/saved':         'savedVerses',

    '.*':                   'index'
  },

  index: function() {
    this.navigate('verses', true);
  },

  allVerses: function() {
    this.renderVerseList('All Verses', null);
  },

  learningVerses: function() {
    this.renderVerseList('Learning Verses', 'learning');
  },

  memorizedVerses: function() {
    this.renderVerseList('Memorized Verses', 'memorized');
  },

  savedVerses: function() {
    this.renderVerseList('Saved Verses', 'saved');
  },

  renderVerseList: function(title, list) {
    var view = new App.Views.VerseList({
      el: $('body'),
      model: new App.Models.VerseList({
        title: title,
        list: list
      })
    });

    view.render();
  }

});
define(['backbone', 'views/verselistview', 'models/verselistmodel'], function (Backbone, VerseListView, VerseListModel) {
  'use strict';

  return Backbone.Router.extend({

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
      var view = new VerseListView({
        el: $('body'),
        model: new VerseListModel({
          title: title,
          list: list
        })
      });

      view.render();
    }

  });

});
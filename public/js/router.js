define(['backbone', 'views/verselistview', 'models/verselistmodel', 'collections/versescollection', 'views/verseview',
  'views/newverseview'],
function (Backbone, VerseListView, VerseListModel, VersesCollection, VerseView, NewVerseView) {
  'use strict';

  return Backbone.Router.extend({

    routes: {
      'verses':               'allVerses',
      'verses/learning':      'learningVerses',
      'verses/memorized':     'memorizedVerses',
      'verses/saved':         'savedVerses',
      'verse/new':            'newVerse',
      'verse/:id':            'verse',
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
        model: new VerseListModel({
          title: title,
          list: list
        })
      });

      view.render();
    },

    verse: function(id) {
      var model = App.Verses.get(id);
      var view = new VerseView({
        el: $('body'),
        model: model
      });

      view.render();
    },

    newVerse: function() {
      var view = new NewVerseView();
      view.render();
    }

  });

});
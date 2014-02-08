define(['backbone', 'views/verselistview', 'models/verselistmodel', 'collections/versescollection', 'views/verseview',
  'views/newverseview', 'views/editverseview'],
function (Backbone, VerseListView, VerseListModel, VersesCollection, VerseView, NewVerseView, EditVerseView) {
  'use strict';

  return Backbone.Router.extend({

    routes: {
      'reset':                'reset',
      'verses':               'allVerses',
      'verses/learning':      'learningVerses',
      'verses/memorized':     'memorizedVerses',
      'verse/new':            'newVerse',
      'verse/:id':            'verse',
      'verse/edit/:id':       'editVerse',
      '.*':                   'index'
    },

    index: function() {
      this.navigate('verses/learning', true);
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

    renderVerseList: function(title, list) {
      var view = new VerseListView({
        model: new VerseListModel({
          title: title,
          list: list
        })
      });

      App.mainRegion.show(view);
    },

    verse: function(id) {
      var model = App.Verses.get(id);
      var view = new VerseView({
        model: model
      });

      App.mainRegion.show(view);
    },

    newVerse: function() {
      var view = new NewVerseView();
      App.mainRegion.show(view);
    },

    editVerse: function(id) {
      var model = App.Verses.get(id);
      var view = new EditVerseView({
        model: model
      });

      App.mainRegion.show(view);
    },

    reset: function() {
      require(['fixtures'], function() {
        window.location.href = '/';
      });
    }

  });

});
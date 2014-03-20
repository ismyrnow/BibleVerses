define(['backbone', 'views/verse-list-view', 'models/verse-list-model', 'collections/verses-collection', 'views/verse-view',
  'views/new-verse-view', 'views/edit-verse-view'],
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

    index: function () {
      this.navigate('verses/learning', true);
    },

    allVerses: function () {
      this.renderVerseList();
    },

    learningVerses: function () {
      this.renderVerseList('learning');
    },

    memorizedVerses: function () {
      this.renderVerseList('memorized');
    },

    renderVerseList: function (list) {
      var view = new VerseListView({
        model: new VerseListModel({
          list: list
        })
      });

      App.mainRegion.show(view);
    },

    verse: function (id) {
      var model = App.Verses.get(id);
      var view = new VerseView({
        model: model
      });

      App.mainRegion.show(view);
    },

    newVerse: function () {
      var view = new NewVerseView();
      App.mainRegion.show(view);
    },

    editVerse: function (id) {
      var model = App.Verses.get(id);
      var view = new EditVerseView({
        model: model
      });

      App.mainRegion.show(view);
    },

    reset: function () {
      require(['fixtures'], function () {
        window.location.href = '/';
      });
    }

  });

});

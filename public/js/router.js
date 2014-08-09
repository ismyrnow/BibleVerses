define(['backbone', 'views/verse-list-view', 'models/verse-list-model', 'collections/verses-collection', 'views/verse-view',
  'views/new-verse-view', 'views/edit-verse-view'],
function (Backbone, VerseListView, VerseListModel, VersesCollection, VerseView, NewVerseView, EditVerseView) {
  'use strict';

  var preResetHash;

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

    initialize: function () {
      this.listenTo(Backbone, 'page-transition', this.pageTransition);
    },

    pageTransition: function (fragment, options) {
      // Tell the region if we should transition in the next view.
      App.mainRegion.transitionNext = options.transition;
      this.navigate(fragment, options);
    },

    index: function () {
      this.navigate('verses/learning', { trigger: true, replace: true });
    },

    allVerses: function () {
      this.renderVerseList();
    },

    learningVerses: function () {
      preResetHash = window.location.hash;
      this.renderVerseList('learning');
    },

    memorizedVerses: function () {
      preResetHash = window.location.hash;
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
      var srsly = window.confirm('Are you sure you want to reset your verses?');

      if (!srsly) {
        window.location.hash = preResetHash;
        return;
      }

      require(['infrastructure/fixtures'], function () {
        window.location.hash = '#';
      });
    }

  });

});

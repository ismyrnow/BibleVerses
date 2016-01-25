'use strict';
var _ = require('underscore');
var Backbone = require('backbone');
var VerseListView = require('./views/verse-list-view');
var VerseListModel = require('./models/verse-list-model');
var VersesCollection = require('./collections/verses-collection');
var VerseView = require('./views/verse-view');
var NewVerseView = require('./views/new-verse-view');
var EditVerseView = require('./views/edit-verse-view');
var fixtures = require('./infrastructure/fixtures');

module.exports = Backbone.Router.extend({

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
    var srsly = window.confirm('Are you sure you want to reset your verses?');

    if (!srsly) {
      window.location.href = '/';
      return;
    }

    var localStorage = window.localStorage;
    localStorage.clear();
    for (var i in fixtures) {
      localStorage.setItem('bibleverses-' + fixtures[i].id, JSON.stringify(fixtures[i]));
    }
    localStorage.setItem('bibleverses', _.pluck(fixtures, 'id').join(','));

    window.location.href = '/';
  }

});

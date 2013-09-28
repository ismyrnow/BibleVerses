/*global App */
'use strict';

App = App || {};

App.VerseList = Backbone.Collection.extend({

  model: App.Verse,

  localStorage: new Backbone.LocalStorage('bibleverses')

});

App.Verses = new App.VerseList;
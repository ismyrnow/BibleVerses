/*global App */
'use strict';

var App = App || {};
App.Collections = App.Collections || {};

App.Collections.Verses = Backbone.Collection.extend({

  model: App.Models.Verse,

  localStorage: new Backbone.LocalStorage('bibleverses')

});
/*global App */
'use strict';

var App = App || {};

App.VerseCollection = Backbone.Collection.extend({

  model: App.VerseModel,

  localStorage: new Backbone.LocalStorage('bibleverses')

});
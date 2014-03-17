define(['backbone', 'models/verse-model', 'backbone-localstorage'], function (Backbone, VerseModel) {
  'use strict';

  return Backbone.Collection.extend({

    model: VerseModel,

    localStorage: new Backbone.LocalStorage('bibleverses')

  });

});
/*global App */
'use strict';

var App = App || {};

App.Verse = Backbone.Model.extend({

  defaults: function() {
    return {};
  }

});

// book: DS.attr('string'),
// chapter: DS.attr('number'),
// verseStart: DS.attr('number'),
// verseEnd: DS.attr('number'),
// version: DS.attr('string'),
// text: DS.attr('string'),
// list: DS.attr('string'),
// dateAdded: DS.attr('date'),
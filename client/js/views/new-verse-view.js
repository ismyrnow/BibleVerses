'use strict';
var $ = require('jquery');
var Marionette = require('backbone.marionette');
var template = require('../templates/new-verse.hbs');
var debounce = require('../infrastructure/debounce');

module.exports = Marionette.ItemView.extend({

  template: template,

  events: {
    'click #save-verse': 'saveVerse',
    'keyup [name=reference]': 'referenceChanged'
  },

  saveVerse: function () {
    var reference = this.$('input[name=reference]').val();
    var version = this.$('input[name=version]').val();
    var list = this.$('select[name=list]').val();
    var text = this.$('textarea[name=text]').val();

    var verseModel = {
      reference: reference,
      text: text,
      version: version,
      list: list,
      dateAdded: Date.now()
    };

    App.Verses.create(verseModel);
    this.transitionTo('#', 'prev');
  },

  referenceChanged: debounce(function () {
    // TODO: check to see if reference looks legit
    var self = this;
    var reference = this.$('input[name=reference]').val();
    var version = this.$('input[name=version]').val();

    this.ajaxGetPassage(reference, version).then(function (result) {
      self.$('textarea[name=text]').val(result.text);
    });
  }, 1000),

  ajaxGetPassage: function (reference, version) {
    return $.ajax({
      url: 'api/passage',
      data: {
        'reference': reference,
        'version': version
      },
      dataType: 'json'
    }).promise();
  }

});

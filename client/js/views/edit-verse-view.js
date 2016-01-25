'use strict';
var $ = require('jquery');
var Handlebars = require('hbsfy/runtime');
var Marionette = require('backbone.marionette');
var template = require('../templates/edit-verse.hbs');
var debounce = require('../infrastructure/debounce');

module.exports = Marionette.ItemView.extend({

  initialize: function () {
    this.referenceChangedDebounced = debounce(this.referenceChanged, 1000);
    Handlebars.registerHelper('select', this.selectHelper);
  },

  template: template,

  events: {
    'click #save-verse': 'saveVerse',
    'click #delete-verse': 'deleteVerse',
    'keyup [name=reference]': 'referenceChangedDebounced'
  },

  saveVerse: function () {
    var reference = this.$('input[name=reference]').val();
    var version = this.$('input[name=version]').val();
    var list = this.$('select[name=list]').val();
    var text = this.$('textarea[name=text]').val();

    this.model.save({
      reference: reference,
      text: text,
      version: version,
      list: list
    });

    this.transitionTo('#', 'prev');
  },

  deleteVerse: function () {
    this.model.destroy();
    this.transitionTo('#', 'prev');
  },

  referenceChanged: function () {
    // TODO: check to see if reference looks legit
    var self = this;
    var reference = this.$('input[name=reference]').val();
    var version = this.$('input[name=version]').val();

    this.ajaxGetPassage(reference, version).then(function (result) {
      self.$('textarea[name=text]').val(result.text);
    });
  },

  ajaxGetPassage: function (reference, version) {
    return $.ajax({
      url: 'api/passage',
      data: {
        'reference': reference,
        'version': version
      },
      dataType: 'json'
    }).promise();
  },

  selectHelper: function (value, options) {
    var $el = $('<select />').html(options.fn(this));
    $el.find('[value=' + value + ']').attr({'selected': 'selected'});
    return $el.html();
  }

});

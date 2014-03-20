define(['handlebars', 'marionette', 'hbs!templates/new-verse', 'infrastructure/debounce', 'jquery', 'backbone-touch'],
function (Handlebars, Marionette, template, debounce, $) {
  'use strict';

  return Marionette.ItemView.extend({

    initialize: function () {
      this.referenceChangedDebounced = debounce(this.referenceChanged, 1000);
    },

    template: template,

    events: {
      'click #save-verse': 'saveVerse',
      'keyup [name=reference]': 'referenceChangedDebounced'
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
      window.location.hash = '#';
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
    }

  });

});

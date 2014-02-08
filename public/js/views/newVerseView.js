define(['handlebars', 'marionette', 'hbs!templates/newVerse', 'debounce'],
function (Handlebars, Marionette, template, debounce) {
  'use strict';

  return Marionette.ItemView.extend({

    initialize: function() {
      this.referenceChangedDebounced = debounce(this.referenceChanged, 1000);
    },

    template: template,

    events: {
      'click #save-verse': 'saveVerse',
      'keyup [name=reference]': 'referenceChangedDebounced'
    },

    saveVerse: function() {
      var reference = $('input[name=reference]').val();
      var version = $('select[name=version]').val();
      var list = $('select[name=list]').val();
      var text = $('textarea[name=text').val();

      var verseModel = {
        reference: reference,
        text: text,
        version: version,
        list: list,
        dateAdded: Date.now()
      };

      App.Verses.create(verseModel);
      window.location.hash = "#";
    },

    referenceChanged: function() {
      // TODO: check to see if reference looks legit
      var reference = $('input[name=reference]').val();
      var version = $('select[name=version]').val();

      this.ajaxGetPassage(reference, version).then(function(result) {
        $('textarea[name=text]').val(result.text);
      });
    },

    ajaxGetPassage: function(reference, version) {
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
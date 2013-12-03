define(['handlebars', 'marionette', 'hbs!templates/newVerse'],
function (Handlebars, Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({
    
    el: $('body'),

    template: template,

    events: {
      'click #save-verse': 'saveVerse'
    },

    saveVerse: function() {
      var self = this;
      var reference = $('input[name=reference]').val();
      var version = $('select[name=version]').val();
      var list = $('select[name=list]').val();

      this.ajaxGetPassage(reference, version).then(function(result) {
        var verseModel = {
          reference: result.reference,
          text: result.text,
          version: result.version,
          list: list,
          dateAdded: Date.now()
        };

        App.Verses.create(verseModel);
        window.location.hash = "#";

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
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
        var passage = result.response.search.result.passages[0];
        var reference = passage.display;
        var text = self.cleanPassageText(passage.text);
        var version = passage.version_abbreviation;

        var verseModel = {
          reference: reference,
          text: text,
          version: version,
          list: list,
          dateAdded: Date.now()
        };

        App.Verses.create(verseModel);
        window.location.hash = "#";

      });
    },

    cleanPassageText: function(html) {
      return $(html).find(':not(.s1, sup)').text();
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
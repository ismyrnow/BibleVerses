define(['handlebars', 'marionette', 'hbs!templates/editVerse', 'debounce'],
function (Handlebars, Marionette, template, debounce) {
  'use strict';

  return Marionette.ItemView.extend({

    initialize: function() {
      this.referenceChangedDebounced = debounce(this.referenceChanged, 1000);
      window.Handlebars.registerHelper('select', this.selectHelper);
    },
    
    el: $('body'),

    template: template,

    events: {
      'click #save-verse': 'saveVerse',
      'click #delete-verse': 'deleteVerse',
      'keyup [name=reference]': 'referenceChangedDebounced'
    },

    saveVerse: function() {
      var reference = $('input[name=reference]').val();
      var version = $('select[name=version]').val();
      var list = $('select[name=list]').val();
      var text = $('textarea[name=text').val();

      this.model.save({
        reference: reference,
        text: text,
        version: version,
        list: list
      });

      window.location.hash = "#";
    },

    deleteVerse: function() {
      this.model.destroy();
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
    },

    selectHelper: function(value, options) {
      var $el = $('<select />').html(options.fn(this));
      $el.find('[value=' + value + ']').attr({'selected':'selected'});
      return $el.html();
    }

  });

});
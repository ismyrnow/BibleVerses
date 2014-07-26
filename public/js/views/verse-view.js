define(['handlebars', 'marionette', 'hbs!templates/verse'],
function (Handlebars, Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({

    template: template,

    templateHelpers: {

      verseTextToHtml: function () {
        return this.text.replace(/(\r\n|\n|\r)/gm, '<br>');
      }

    }

  });

});

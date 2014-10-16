define(['handlebars', 'marionette', 'hbs!templates/verse'],
function (Handlebars, Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({

    template: template,

    events: {
      'click #memorized-verse': 'memorizedVerse',
    },

    memorizedVerse: function () {
      this.model.save({
        list: 'memorized'
      });

      this.transitionTo('#', 'prev');
    },

    templateHelpers: {

      verseTextToHtml: function () {
        return this.text.replace(/(\r\n|\n|\r)/gm, '<br>');
      },

      notMemorized: function () {
        return this.list === 'learning';
      }

    }

  });

});

'use strict';
var $ = require('jquery');
var Marionette = require('backbone.marionette');
var template = require('../templates/verse.hbs');

module.exports = Marionette.ItemView.extend({

  template: template,

  templateHelpers: {

    verseTextToHtml: function () {
      return this.text.replace(/(\r\n|\n|\r)/gm, '<br>');
    }

  }

});

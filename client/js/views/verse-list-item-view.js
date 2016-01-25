'use strict';
var Marionette = require('backbone.marionette');
var template = require('../templates/verse-list-item.hbs');

module.exports = Marionette.ItemView.extend({

  tagName: 'li',

  template: template

});

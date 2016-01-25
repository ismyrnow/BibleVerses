'use strict';
var Backbone = require('backbone');
var VerseModel = require('../models/verse-model');
require('backbone.localstorage');

module.exports = Backbone.Collection.extend({

  model: VerseModel,

  localStorage: new Backbone.LocalStorage('bibleverses')

});

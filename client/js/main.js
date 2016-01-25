'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var attachFastClick  = require('fastclick');
//require('backbone.touch');
var Router = require('./router');
var VersesCollection = require('./collections/verses-collection');
require('./infrastructure/marionette-handlebars');
require('./infrastructure/marionette-transitions');

// TODO: refactor this now that we're using browserify.
var App = window.App = new Marionette.Application();

// Remove touch delay for iOS.
attachFastClick(document.body);

// Hack around iOS standalone mode (Safari's "Add to Home Screen").
if (window.navigator.standalone) {
  $('body').addClass('standalone');
}

App.addRegions({
  mainRegion: 'body'
});

// Bootstrap verses collection and put it on the App namespace.
App.Verses = new VersesCollection();
App.Verses.fetch({
  success: function () {
    new Router();
    Backbone.history.start();
  }
});

'use strict';

require.config({
  paths : {
    'jquery'     : '../bower_components/jquery/jquery',
    'underscore' : '../bower_components/underscore/underscore',
    'backbone'   : '../bower_components/backbone/backbone',
    'backbone-localstorage' : '../bower_components/backbone.localStorage/backbone.localStorage',
    'backbone-touch' : '../bower_components/backbone.touch/backbone.touch',
    'marionette' : '../bower_components/marionette/lib/backbone.marionette',
    'handlebars' : '../bower_components/handlebars/handlebars',
    'hbs'        : '../bower_components/requirejs-hbs/hbs',
    'text'       : '../bower_components/requirejs-text/text'
  },
  shim : {
    'handlebars' : {
      exports: 'Handlebars'
    },
    'underscore' : {
      exports : '_'
    },
    'backbone' : {
      exports : 'Backbone',
      deps : ['jquery', 'underscore']
    },
    'marionette' : {
      exports : 'Backbone.Marionette',
      deps : ['backbone']
    }
  },
  deps : ['jquery', 'underscore', 'infrastructure/marionette-handlebars', 'infrastructure/marionette-transitions']
});

require(['backbone', 'marionette', 'router', 'collections/verses-collection'],
function (Backbone, Marionette, Router, VersesCollection) {
  window.App = new Marionette.Application();

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

});

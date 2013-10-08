require.config({
  paths : {
    'jquery'     : '../bower_components/jquery/jquery',
    'underscore' : '../bower_components/underscore/underscore',
    'backbone'   : '../bower_components/backbone/backbone',
    'backbone-localStorage' : '../bower_components/backbone/examples/backbone.localStorage',
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
      deps : ['jquery','underscore']
    },
    'marionette' : {
      exports : 'Backbone.Marionette',
      deps : ['backbone']
    }
  },
  deps : ['jquery','underscore', 'marionette-handlebars', 'fixtures']
});

require(['backbone', 'router'], function(Backbone, Router) {
  'use strict';

  new Router();

  Backbone.history.start();
});
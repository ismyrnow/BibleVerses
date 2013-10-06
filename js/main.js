require.config({
  paths : {
    'jquery'     : '../bower_components/jquery/jquery',
    'underscore' : '../bower_components/underscore/underscore',
    'backbone'   : '../bower_components/backbone/backbone',
    'backbone-localStorage' : '../bower_components/backbone/examples/backbone.localStorage',
    'handlebars' : '../bower_components/handlebars/handlebars'
  },
  shim : {
    'handlebars' : {
      exports: "Handlebars"
    },
    'underscore' : {
      exports : '_'
    },
    'backbone' : {
      exports : 'Backbone',
      deps : ['jquery','underscore']
    }
  },
  deps : ['jquery','underscore']
});

require(['backbone', 'router', 'fixtures'], function(Backbone, Router) {
  'use strict';

  new Router();

  Backbone.history.start();
});
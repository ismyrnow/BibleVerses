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
  deps : ['jquery', 'underscore', 'marionette-handlebars']
});

require(['backbone', 'marionette', 'router', 'collections/verses-collection'],
function (Backbone, Marionette, Router, VersesCollection) {
  window.App = new Marionette.Application();
  
  Marionette.Region.prototype.open = function (view) {
    var $viewEl = $(view.el);
    this.$el.append($viewEl);
    setTimeout(function () {
      $viewEl.addClass('transition-in');
    }, 1);
  };
  
  Marionette.Region.prototype.close = function(){
    var view = this.currentView;
    if (!view || view.isClosed){ return; }
    
    var $viewEl = $(this.currentView.el);
    $viewEl.removeClass('transition-in').addClass('transition-out');
    setTimeout(function () {      

      // call 'close' or 'remove', depending on which is found
      if (view.close) { view.close(); }
      else if (view.remove) { view.remove(); }

      Marionette.triggerMethod.call(this, 'close');

      delete this.currentView;
      
    }, 700);
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

});
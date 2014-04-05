define(['marionette', 'jquery'], function (Marionette, $) {
  'use strict';

  Marionette.Region.prototype.close = function () {
    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }

    var $viewEl = $(this.currentView.el);
        
    var close = closeView.bind(this, view);
    
    if (this.transitionNext) {
      var endClass, zIndex;
      
      // If transitioning back ('prev'), move old view to the right.
      if (this.transitionNext === 'prev') {
        endClass = 'out-right';
        zIndex = 2;
      } else {
        endClass = 'out-left';
        zIndex = 1;
      }
      
      $viewEl.addClass('transition')
        .addClass(endClass)
        .removeClass('in')
        .css('z-index', zIndex);
      
      $viewEl.on('transitionend oTransitionEnd webkitTransitionEnd', close);
    } else {
      close();
    }
  };

  Marionette.Region.prototype.open = function (view) {
    var $viewEl = $(view.el);
    
    if (this.transitionNext) {
      var startClass, zIndex;
      
      // If transitioning back ('prev'), start new view on the left.
      if (this.transitionNext === 'prev') {
        startClass = 'out-left';
        zIndex = 1;
      } else {
        startClass = 'out-right';
        zIndex = 2;
      }
      
      $viewEl.addClass('transition')
        .addClass(startClass)
        .css('z-index', zIndex);
      
      this.$el.append($viewEl);
      
      // The timeout ensures the element is appended before the class is added.
      setTimeout(function () {
        $viewEl.removeClass(startClass).addClass('in');
      }, 1);
    } else {
      $viewEl.addClass('in');
      this.$el.append($viewEl);
    }
    
    this.transitionNext = false;
  };
  
  function closeView(view) {
    // call 'close' or 'remove', depending on which is found
    if (view.close) { view.close(); }
    else if (view.remove) { view.remove(); }

    Marionette.triggerMethod.call(this, 'close');
  }

});

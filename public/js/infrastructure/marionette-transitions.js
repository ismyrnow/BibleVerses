define(['marionette', 'backbone', 'jquery'], function (Marionette, Backbone, $) {
  'use strict';
  
  // Handle all anchor clicks if they contain data-transition
  $(document).on('click', 'a[data-transition]', function (e) {
    var $link = $(e.currentTarget);
    var transition = $link.data('transition');
    var href = $link.attr('href').substring(1);

    e.preventDefault();

    Backbone.trigger('page-transition', href, {
      trigger: true,
      replace: true,
      transition: transition
    });
  });
  
  Backbone.View.prototype.transitionTo = function (href, transition) {    
    Backbone.trigger('page-transition', href, {
      trigger: true,
      replace: true,
      transition: transition
    });
  };

  Marionette.Region.prototype.close = function () {
    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }

    var $viewEl = $(this.currentView.el);
        
    var close = closeView.bind(this, view);
    
    if (this.transitionNext) {
      var endCss, zIndex;
      
      // If transitioning back ('prev'), move old view to the right.
      if (this.transitionNext === 'prev') {
        endCss = 'translateX(100%)';
        zIndex = 2;
      } else {
        endCss = 'translateX(-20%)';
        zIndex = 1;
      }
      
      $viewEl.css('-webkit-transform', endCss)
        .css('z-index', zIndex);
      
      $viewEl.on('transitionend oTransitionEnd webkitTransitionEnd', close);
    } else {
      close();
    }
  };

  Marionette.Region.prototype.open = function (view) {
    var $viewEl = $(view.el);
    
    if (this.transitionNext) {
      var startCss, zIndex;
      
      // If transitioning back ('prev'), start new view on the left.
      if (this.transitionNext === 'prev') {
        startCss = 'translateX(-20%)';
        zIndex = 1;
      } else {
        startCss = 'translateX(100%)';
        zIndex = 2;
      }
      
      $viewEl.css('-webkit-transform', startCss)
        .css('z-index', zIndex);
      
      this.$el.append($viewEl);
      
      // The timeout ensures the element is appended before the class is added.
      setTimeout(function () {
        $viewEl.css('-webkit-transform', 'translateX(0%)');
      }, 10);
    } else {
      $viewEl.css('-webkit-transform', 'translateX(0%)');
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

define(['marionette', 'jquery'], function (Marionette, $) {
  'use strict';

  Marionette.Region.prototype.open = function (view) {
    var $viewEl = $(view.el);
    this.$el.append($viewEl);
    setTimeout(function () {
      $viewEl.addClass('transition-in');
    }, 1);
  };

  Marionette.Region.prototype.close = function () {
    var view = this.currentView;
    if (!view || view.isClosed) {
      return;
    }

    var $viewEl = $(this.currentView.el);
    $viewEl.removeClass('transition-in').addClass('transition-out');
    setTimeout(function () {

      // call 'close' or 'remove', depending on which is found
      if (view.close) { view.close(); }
      else if (view.remove) { view.remove(); }

      Marionette.triggerMethod.call(this, 'close');

      delete this.currentView;

    }, 700);
  };

});

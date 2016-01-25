'use strict';
var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');

// TODO: Custom animated transitions broke in Marionette 2.0. Maybe implement these?
// http://codepen.io/somethingkindawierd/pen/cpiEw

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

Marionette.View.prototype.transitionTo = function (href, transition) {
  Backbone.trigger('page-transition', href, {
    trigger: true,
    replace: true,
    transition: transition
  });
};

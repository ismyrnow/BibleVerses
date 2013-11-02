define(['handlebars', 'marionette', 'hbs!templates/newVerse'],
function (Handlebars, Marionette, template) {
  'use strict';

  return Marionette.ItemView.extend({
    
    el: $('body'),

    template: template,

    events: {
    	'focus input[name="reference"]': 'selectReference'
    },

    selectReference: function() {
    	$('input[name="reference"]').blur();
    	alert('todo');
    }

  });

});
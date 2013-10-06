define(['backbone', 'models/versemodel', 'backbone-localStorage'], function (Backbone, VerseModel) {
	'use strict';

	return Backbone.Collection.extend({

	  model: VerseModel,

	  localStorage: new Backbone.LocalStorage('bibleverses')

	});

});
/*global App Ember */
'use strict';

App.Router.map(function () {
	this.resource('verses', { path: '/' }, function () {
		this.route('learning');
		this.route('memorized');
		this.route('saved');
	});
});

App.VersesRoute = Ember.Route.extend({
	model: function () {
		var store = this.get('store');
		return store.findAll('verse');
	}
});

App.VersesIndexRoute = Ember.Route.extend({
	setupController: function () {
		var store = this.get('store');
		var verses = store.findAll('verse');
		this.controllerFor('verses').set('filteredVerses', verses);
	}
});
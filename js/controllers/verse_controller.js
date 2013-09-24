/*global App Ember */
'use strict';

App.VerseController = Ember.ObjectController.extend({
	isEditing: false,

	editVerse: function () {
		this.set('isEditing', true);
	},

	removeVerse: function () {
		var verse = this.get('model');

		verse.deleteRecord();
		verse.get('store').commit();
	}
});
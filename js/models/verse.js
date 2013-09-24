/*global App DS Ember */
'use strict';

App.Verse = DS.Model.extend({
	book: DS.attr('string'),
	chapter: DS.attr('number'),
	verseStart: DS.attr('number'),
	verseEnd: DS.attr('number'),
	version: DS.attr('string'),
	text: DS.attr('string'),
	list: DS.attr('string'),
	dateAdded: DS.attr('date'),

	verseDidChange: function () {
		Ember.run.once(this, function () {
			this.get('store').commit();
		});
	}.observes('book')
});
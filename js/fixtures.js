define(['underscore'], function(_) {
	'use strict';

	var localStorage = window.localStorage;

	var fixtures = [
		{ id: '1', book: 'Deuteronomy', chapter: 7, verseStart: 9, version: 'NIV', text: 'Know therefore that the LORD your God is God; he is the faithful God, keeping his covenant of love to a thousand generations of those who love him and keep his commands.', list: 'memorized', dateAdded: '8/6/2013' },
	  { id: '2', book: 'Psalm', chapter: 56, verseStart: 3, verseEnd: 4, version: 'NIV', text: 'When I am afraid, I will trust in you. In God, whose word I praise, in God I trust; I will not be afraid. What can mortal man do to me?', list: 'learning', dateAdded: '9/19/2013' }
	];

	localStorage.clear();

	for (var i in fixtures) {
		localStorage.setItem('bibleverses-' + fixtures[i].id, JSON.stringify(fixtures[i]));
	}
	localStorage.setItem('bibleverses', _.pluck(fixtures, 'id').join(','));

});
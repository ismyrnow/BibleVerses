/*global localStorage */
'use strict';

(function() {

	var fixtures = {
	  'App.Verse': {
	    records: {
	      'v1': { id: 'v1', book: 'Deuteronomy', chapter: 7, verseStart: 9, version: 'NIV', text: 'Know therefore that the LORD your God is God; he is the faithful God, keeping his covenant of love to a thousand generations of those who love him and keep his commands.', list: 'learning', dateAdded: '8/6/2013' },
	      'v2': { id: 'v2', book: 'Psalm', chapter: 56, verseStart: 3, verseEnd: 4, version: 'NIV', text: 'When I am afraid, I will trust in you. In God, whose word I praise, in God I trust; I will not be afraid. What can mortal man do to me?', list: 'learning', dateAdded: '9/19/2013' }
	    }
	  }
	};

	// Bootstrap data.
	localStorage.setItem('DS.LSAdapter', JSON.stringify(fixtures));

})();
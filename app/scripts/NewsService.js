/*
 	NewsService is resposible for get local or remote data resource, sort/filter/convert the results and return a promise
*/

;(function( window ) {

	'use strict';

	function NewsService (params) {
		this.sortBy = params.sortBy;
		this.itemsNumber = params.itemsNumber;

		var resource = getLocalResource();
		return this.processFeed(resource);

	}

	function getLocalResource() {	
		return $.getJSON( 'resource/newsfeed.json', {
			format: 'json'
		});
	    
	}

	NewsService.prototype.processFeed = function(promise) {	
		var self = this;
		var feed = {};
		var dfd = new $.Deferred();
		promise.done(function( data ) {    	
	    	
	    	if (self.sortBy === 'priority') {
				feed = sortByPriority(data.entries);
	    	} else {
	    		feed = sortByDate(data.entries);
	    	}
	        feed = limitItemsNumber(data, self.itemsNumber);
	    	//self.feed = data;
	    	//console.log('feed', feed, data);
	    	dfd.resolve(feed);
	    });

	    return dfd.promise();
	    
	};

	var sortByDate = function (feed) {
		function comp(a, b) {
		    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
		}

		feed.sort(comp);
		return feed;
	};

	var sortByPriority = function (feed) {
		function comp(a, b) {
		    return b.Promoted - a.Promoted;
		}

		feed.sort(comp);
		return feed;
	};

	var limitItemsNumber = function (feed, num) {
		if (num) {
			feed.entries = feed.entries.slice(0, num);
		}
		return feed;
		
	};

	window.NewsService = NewsService;


})( window );
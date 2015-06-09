/*
	WidgetFactory is responsible for choosing the widget according to the parameter passed in and return widget instance 	
*/
;(function( window ) {

	'use strict';

	function WidgetFactory (params) {
		
		this.getWidget = function (params) {
			var widget = {};
			var re = /^(\w+)\-/; // Parse for type based on naming convention type-
			var viewtype = params.templateName.match(re)[1];

			// Add new type support here
			if (viewtype === 'card' ) {
				widget = new CardWidget(params);
			} else {
				// Default type 
				widget = new ListWidget(params);
			} 
			

			return widget;
		};
		

	}

	window.WidgetFactory = WidgetFactory;


})( window );
'use strict';

(function() { 
	$('.demo-1').newsBox({'template': 'card-view'});
	$('.demo-2').newsBox({
		'template': 'list-view-media',
		'number': 5,
		'sortBy': 'priority',
		'afterRender': function () {
			console.log('callback');
		}
	});
	$('.demo-3').newsBox();
	$('.demo-4').newsBox({
		'template': 'list-view',
		'number': 5,
		'sortBy': 'priority'
	});

})();

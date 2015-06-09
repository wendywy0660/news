/*
 	BasicWidget is a basic widget class
 	Its is responsible for picking right template
 	Support for basic Callbacks

 	Develoeprs can enhance funcationality of the this widget by overing basic functionality.

 	CardWidget has overrides afterRender event so that we can implment new functionality to overlay details etc.
*/

//;(function( window ) {

	'use strict';

	function BasicWidget (templateName, container, beforeRender, afterRender) {
		this.templateName = templateName;
		this.container = container;
		this.beforeRender = beforeRender;
		this.afterRender = afterRender;
	}
	BasicWidget.prototype.loadTemplate  = function () {
		var promise = $.ajax({
		 	url: 'templates/' + this.templateName + '.html',
		    cache: true    
		});       
		return promise; 
	};
	BasicWidget.prototype.render  = function (resource) {
		var self = this;
       // Anything need to do before rendering the template
		if (self.beforeRender){
  			self.beforeRender();
  		}

        $.when( self.loadTemplate() ).done(function( tpl ) {
        	// Render the html
    		var template  = Handlebars.compile(tpl);
      		self.container.html(template(resource));

      		// Anything need to do after rendering the template e.g. bind event/initialize plugin
      		if (self.afterRender){
      			self.afterRender();
      		}
		});
    };
	
	BasicWidget.prototype.resize  = function () { 
		//TODO: for resize event
	}

	function CardWidget(params) {
		var arr = $.map(params, function(el){return el;});
    	BasicWidget.apply(this, arr);
    	var self = this;
		this.afterRender = function () {
			self.container.on('click', '.card', function() {
				$('.card-reveal', this).addClass('revealed');
				return false;
			});
			self.container.on('click', '.close', function() {
				var $parent = $(this).closest('.card');
				$('.card-reveal', $parent).removeClass('revealed');
				return false;
			});

			(function initSlider(){
				 $('.jcarousel', self.container).jcarousel();
				  $('.jcarousel-control-prev', self.container)
		            .on('jcarouselcontrol:active', function() {
		                $(this).removeClass('inactive');
		            })
		            .on('jcarouselcontrol:inactive', function() {
		                $(this).addClass('inactive');
		            })
		            .jcarouselControl({
		                target: '-=1'
		            });

		        $('.jcarousel-control-next', self.container)
		            .on('jcarouselcontrol:active', function() {
		                $(this).removeClass('inactive');
		            })
		            .on('jcarouselcontrol:inactive', function() {
		                $(this).addClass('inactive');
		            })
		            .jcarouselControl({
		                target: '+=1'
		            });

			})();

		};
	}
	CardWidget.prototype = new BasicWidget();



	function ListWidget(params) {
		var arr = $.map(params, function(el){return el;});
    	BasicWidget.apply(this, arr);

	}
	ListWidget.prototype = new BasicWidget();




//})( window );
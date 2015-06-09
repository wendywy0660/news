/*!
 * jQuery newsBox Plugin
 * @author: Wendy WANG
 * @version: 1.0 (Sun, 07 Jun 2015)
 *
 */

;(function($, document, window, undefined) {
  'use strict';

  (function(pluginName) {

    function NewsWidget(options) {
      this.templateName = options.template;
      this.itemsNumber = options.number;
      this.sortBy = options.sortBy;
      this.container = options.container;

      this.beforeRender = options.beforeRender;
      this.afterRender = options.afterRender;
      this.init();
    }

    NewsWidget.prototype.init = function () {
      var self = this;
      var resource = new NewsService({sortBy: this.sortBy, itemsNumber: this.itemsNumber});
      var widgetfactory = new WidgetFactory();

      var widget = widgetfactory.getWidget({templateName: this.templateName, container: this.container, beforeRender: this.beforeRender, afterRender: this.afterRender});


      $.when( resource ).done(function(data) {
              if (data.entries.length >0) {
                widget.render(data);
            } else {
              // TODO: Handle no result senario
              console.log('No news found');
            }
      });

    };

    NewsWidget.prototype.resize = function (source, template) {
      //TODO: Handle the resize event
    };


    var defaults = {
      'template': 'list-view-media',
      'number': 8,
      'sortBy': 'date'
      // 'autoRefresh': false,
      // 'mainColor': '#b51d21'
    };
    $.fn[pluginName] = $[pluginName] = function(options) {
      options = $.extend(true, {}, defaults, options);
            
      return this.each(function() {
        var elem = this,
          $elem = $(elem);

        options.container = $elem;

        new NewsWidget(options);
      });
    };
    $.fn[pluginName].defaults = defaults;
  })('newsBox');
})(jQuery, document, this, undefined);
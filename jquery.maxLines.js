/*
	jquery.maxLines plugin v1.1
	---
	https://github.com/greypants/jQuery.maxLines
*/

;(function($){
	var pluginName = 'maxLines';

	var Plugin = function(el, maxLines, paddingCompensation) {
		this.el = el;
		this.$el = $(el);
	};

	Plugin.prototype = {
		init: function(maxLines, paddingCompensation) {
			this.paddingCompensation = paddingCompensation === false ? paddingCompensation : true;
			this.maxLines = Number(maxLines);
			(this.maxLines === 0) ? this.removeMax() : this.setMax();

			return this;
		},

		setMax: function(){
			var lineHeight = this.measureLineHeight();
			var maxHeight = (this.maxLines * lineHeight) + 'px';

			if(this.paddingCompensation) {
				this.compensateForPadding();
			}

			this.$el.css({
				'max-height': maxHeight,
				'overflow': 'hidden',
				'padding-bottom': '0'
			});
		},

		compensateForPadding: function() {
			// Transform padding-bottom into margin-bottom
			// to keep element spacing consistent.

			var paddingBottom = this.getPixelValue(this.$el, 'padding-bottom');
			var marginBottom = this.getPixelValue(this.$el, 'margin-bottom');
			var adjustedMarginBottom = marginBottom + paddingBottom + 'px';

			this.$el.css({
				'margin-bottom': adjustedMarginBottom
			});
		},

		removeMax: function() {
			this.$el.css({
				'max-height': '',
				'margin-bottom': '',
				'padding-bottom': '',
				'overflow': ''
			});
		},

		getPixelValue: function($el, property) {
			return Number($el.css(property).split('px')[0]);
		},

		measureLineHeight: function() {
			var $temp = $('<div style="margin: 0; padding: 0; display: block;">jT</div>').appendTo(this.$el);
			var lineHeight = $temp.height();
			$temp.remove();
			return lineHeight;
		}
	};

	$.fn[pluginName] = function ( maxLines, paddingCompensation) {
		return this.each(function () {
			var plugin = $.data(this, 'plugin_' + pluginName);
			if (!plugin) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this).init(maxLines, paddingCompensation));
			} else {
				plugin.init(maxLines, paddingCompensation);
			}
		});
	};

})(jQuery);
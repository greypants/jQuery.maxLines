/*
	jquery.maxLines plugin v0.1
	---
	https://github.com/greypants/jQuery.maxLines
*/

;(function($){
	var pluginName = 'maxLines';

	var Plugin = function(el, maxLines, paddingCompensation){
		this.el = el;
		this.$el = $(el);
		this.paddingCompensation = paddingCompensation === false ? paddingCompensation : true;
		this.maxLines = Number(maxLines);
		(this.maxLines === 0) ? this.removeMax() : this.setMax();
	};

	Plugin.prototype = {
		setMax: function(){
			var lineHeight = this.getLineHeight();
			var paddingBottom = this.getPixelSpacingValue('padding-bottom');
			var marginBottom = this.getPixelSpacingValue('margin-bottom');
			var adjustedMarginBottom = marginBottom + paddingBottom + 'px';
			var maxHeight = (this.maxLines * lineHeight) + 'px';

			this.$el.css({
				'max-height': maxHeight,
				'overflow': 'hidden',
				'padding-bottom': '0'
			});

			// Transform padding-bottom into margin-bottom
			// to keep element spacing consistent.
			if(this.paddingCompensation) {
				this.$el.css({
					'margin-bottom': adjustedMarginBottom
				});
			}
		},

		removeMax: function() {
			this.$el.css({
				'max-height': '',
				'margin-bottom': '',
				'padding-bottom': '',
				'overflow': ''
			});
		},

		getPixelSpacingValue: function(property) {
			var value = this.$el.css(property);
			var pixelValue;

			if(value.indexOf('px')) {
					pixelValue = value.split('px')[0];

			} else if(value.indexOf('em')) {
					var ems = value.split('em')[0];
					pixelValue = ems * baseFontSize;
			}

			return Number(pixelValue);
		},

		getPixelFontSize: function(fontSize) {
			if(fontSize.indexOf('px') > 0) {
				return fontSize.split('px')[0];

			} else if(fontSize.indexOf('em') > 0) {
				return (fontSize.split('em')[0] * baseFontSize) + 0.5 | 0;

			} else if(fontSize.indexOf('rem') > 0) {
				return (fontSize.split('rem')[0] * baseFontSize)  + 0.5 | 0;
			}
		},

		getLineHeight: function() {
			var $temp = $('<span style="margin: 0; padding: 0;">jT</span>').appendTo(this.$el);
			var lineHeight = $temp.height();
			$temp.remove();
			return lineHeight;
		}
	};

	$.fn[pluginName] = function ( maxLines, paddingCompensation) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, maxLines, paddingCompensation));
			}
		});
	};

})(jQuery);
describe("jQuery.maxLines", function() {

	var $el, plugin;

	beforeEach(function() {
		$el = $('<div>A powerful criminal brain from the planet Arous, Gor, assumes the body of scientist Steve March. Thru March he begins to control the world by threatening destruction to any country challenging his domination. Another brain, Val, works with Marchs future wife Sally to defeat Gor. Val explains that Gor will be vulnerable when he is forced to leave March at intervals to re-energize. Gors vulnerable spot, the Fissure of Orlando, is described in a note left by Sally in Steve’s lab.</div>');
		$el.appendTo(document.body);
		$el.maxLines(0);
		plugin = $el.data('plugin_maxLines');
	});

	afterEach(function(){
		$el.remove();
	});

	it ("Accurately measures the line-height!", function() {
		$el.css('line-height', '99px');
		var measuredHeight = plugin.measureLineHeight();
		measuredHeight.should.equal(99);
	});

	it ("Can get pixel values as numbers from non-pixel based css properties on objects!", function() {
		$el.css('margin-bottom', '20em');
		var parentFontSize = $el.parent().css('font-size').split('px')[0];
		plugin.getPixelValue($el, 'margin-bottom').should.equal(20 * parentFontSize);
	});

	it ("Removes previously set values!", function() {
		$el.css({
			'max-height': '99px',
			'margin-bottom': '20em',
			'padding-bottom': '39%',
			'overflow': 'scroll'
		});

		plugin.removeMax();

		$el.css('max-height').should.equal('none');
		$el.css('margin-bottom').should.equal('0px');
		$el.css('padding-bottom').should.equal('0px');
		$el.css('overflow').should.equal('visible');
	});

	it ("Can be passed a number sets a max-height!", function() {
		$el.maxLines(3);
		$el.css('max-height').should.not.equal('none');
	});

	it ("Can be passed a number-string sets a max-height!", function() {
		$el.maxLines('3');
		$el.css('max-height').should.not.equal('none');
	});

	it ("Can be passed 0 to remove the max-height!", function() {
		$el.maxLines(3);
		$el.maxLines(0);
		$el.css('max-height').should.equal('none');
	});

	it ("Should default paddingCompenstion to 'true'!", function() {
		$el.maxLines(99);
		plugin.paddingCompensation.should.equal(true);
	});

	it ("Should compensate for padding-bottom before zeroing it out!", function() {
		$el.css('padding-bottom', '99px');
		$el.maxLines(9);
		$el.css('margin-bottom').should.not.equal('0px');
	});

	it ("Can be passed a second value of 'false' to disable padding compensation!", function() {
		$el.maxLines(3, false);
		plugin.paddingCompensation.should.equal(false);
	});
});

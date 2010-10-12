(function($){
	
	var defaultOpts = {
	   duration:1000,
	   complete: function() {},
	   cssClass: 'throbber',
	   mode: 'wrap',                    // wrap | child | overlay
	   container: null
	};
	
	var debug = true;
	var throbberHtml = '<img src="throbber.gif" />';
	
	function _log(msg) {
        if(debug && typeof console !== 'undefined') console.log(msg); 
    }
	
	function _wrap(el, opts) {

		if(opts.container) {
			$el = $(opts.container);
		} else {
    		$el = $(el);
		}
		
		$el.wrap(throbberHtml);

		$el.hide(0).delay(opts.duration).show(0).queue(function() {
            $el.unwrap();
			$el.dequeue();
		});
	}
	
	function _firstChild(el, opts) {
        $el = $(el);

        // set height, width 100%
		// set background (opacity if webkit)
		// append img
		// center it?
        
		$el.prepend('<div class="' + opts.cssClass + '"></div>');
		var $overlay = $el.find('.' + opts.cssClass);
		
		$overlay.width($el.width());
		$overlay.height($el.height());
		
		$overlay.delay(opts.duration).queue(function() {
			$overlay.remove();
	        $overlay.dequeue();
		});
    }
	
    $.fn.throbber = function(opts){
        
        return this.each(function() {
            _log('[jquery.fakeThrobber] ' + this);
            opts = $.extend({}, defaultOpts, opts);
			
			if(opts.mode === 'wrap') {
				_wrap(this, opts);
			} 
			else if(opts.mode === 'firstChild') {
				_firstChild($(opts.container), opts);
			}
        });
        
    };
	
})(jQuery);


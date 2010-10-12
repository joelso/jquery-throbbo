(function($){
	
	var defaultOpts = {
	   duration:1000,
	   complete: function() {},
	   cssClass: 'throbber',
	   mode: 'wrap',                    // wrap | overlay
	   container: null,
	   image:'throbber.gif'
	};
	
	var debug = true;
	var throbberHtml = '<img src="throbber.gif" />';
	
	function _log(msg) {
        if(debug && typeof console !== 'undefined') console.log(msg); 
    }
	
	function _wrap(el, opts) {
		var $el;
		
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
	
	function _overlay(el, opts) {
        var $el, $overlay;
		
		$el = $(el);
		
		$el.prepend('<div class="throbberOverlay"></div>');
		
		$overlay = $el.find('.throbberOverlay');
		
        $overlay.css({
            'position': 'absolute',
            'background': '#f1f1f1 url(' + opts.image + ') center center no-repeat'
        })
		.width( $el.width() ).height( $el.height() )

		.delay(opts.duration).queue(function(){
            $overlay.remove();
            $overlay.dequeue();
        });
    }
	
    $.fn.throbbo = function(opts){
        
        return this.each(function() {
            _log('[jquery.throbbo] ' + this);
            opts = $.extend({}, defaultOpts, opts);
			
			if(opts.mode === 'wrap') {
				_wrap(this, opts);
			} 
			else if(opts.mode === 'overlay') {
				_overlay($(opts.container), opts);
			}
        });
        
    };
	
})(jQuery);


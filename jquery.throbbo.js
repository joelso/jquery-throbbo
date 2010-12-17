/*!
 * jQuery Throbbo Plugin
 * version: 0.1
 * @requires jQuery v1.3.2 or later
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){

    var debug = true;

    var defaultOpts = {
        // How long throbber will show, in ms. If '0' throbber
		// will show until page is reloaded
        duration: 0,
        
        // Callback for when throbber has shown for given duration
        complete: function(){},
        
		// CSS class of throbber element
        cssClass: 'throbbo',
        
        // Decide how throbber will show:
		//
		// 'overlay' (default) show throbber centered in an overlaying div on top of target element
		// 'insertBefore' insert throbber as an image before the target element
        mode: 'overlay',
		
		// Overlay background color, a hex-code or 'inherit'
		bgColor: 'inherit',
        
        // Path to image, relative to HTML-page or absolute
        image: 'throbber.gif',
		
		// CSS property 'z-index' for overlay
		zIndex: 2,
		
		// Custom CSS style for throbber
		styles: {}
    };
    
    function _log(msg){
        if (debug && typeof console !== 'undefined') 
            console.log('[jquery.throbbo] ' + msg);
    }
    
    function _overlay(el, opts){
        var $el = $(el).prepend('<div class="' + opts.cssClass +'"></div>');
		
        var $overlay = $el.find('.' + opts.cssClass);
		
		$overlay.css({
            'position': 'absolute',
			'z-index': opts.zIndex,
            'background': 'url(' + opts.image + ') center center no-repeat',
			'background-color': opts.bgColor
        })
		
		.css(opts.styles)
		
		.width($el.width()).height($el.height());
		
		_queue($overlay, $el, opts);
    }
	
	function _insertBefore($el, opts) {
		if(_isThrobboActive($el)) {
			_log("Throbbo is already active, do nothing");
			return;
		} 
		
		_setThrobboActive($el, true);
		
		var $img = $('<img src="' + opts.image + '" class="' + opts.cssClass +'" /> ');
		
		$img.css(opts.styles).insertBefore($el);
		
		_queue($img, $el, opts);
	}
	
	function _queue($throbber, $el, opts) {
        $throbber.delay(opts.duration).queue(function(){
            if (opts.duration > 0) {
                $throbber.remove();
				
                _setThrobboActive($el, false);
               
			    opts.complete();
            }
            $throbber.dequeue();
        });
	}
	
	function _isThrobboActive($el) {
		return $el.data('jquery.throbbo.active');
	}
	
	function _setThrobboActive($el, val) {
		$el.data('jquery.throbbo.active', val);
	}
    
    $.fn.throbbo = function(opts){
    
        return this.each(function(){
            opts = $.extend({}, defaultOpts, opts);
            
			var $this = $(this);
			
            if (opts.mode === 'overlay') {
                _overlay($this, opts);
            }
            else if (opts.mode === 'insertBefore') {
                _insertBefore($this, opts);
            }
        });
        
    };
    
})(jQuery);

(function($){

    var defaultOpts = {
        // How long throbber will show, in ms
        duration: 1000,
        
        // Callback when throbber has shown for given duration
        complete: function(){},
        
        cssClass: 'throbber',
        
        // In what way throbber will show
        mode: 'overlay',
        
        // Path to image, relative to this script or absolute
        image: 'throbber.gif'
    };
    
    var debug = true;
    
    function _log(msg){
        if (debug && typeof console !== 'undefined') 
            console.log(msg);
    }
    
    function _wrap(el, opts){
        throw ('Not yet implemented!');
        
        var $el = $(el);
        
        /*$el.wrap(throbberHtml);
        
         $el.hide(0).delay(opts.duration).show(0).queue(function() {
        
         $el.unwrap();
        
         $el.dequeue();
        
         });*/
        
    }
    
    function _overlay(el, opts){
        var $el = $(el).prepend('<div class="throbberOverlay"></div>');
        
        var $overlay = $el.find('.throbberOverlay').css({
            'position': 'absolute',
            'background': '#f1f1f1 url(' + opts.image + ') center center no-repeat'
        })
		
		.width($el.width()).height($el.height())
		
		.delay(opts.duration).queue(function(){
            $overlay.remove();
            $overlay.dequeue();
			opts.complete();
        });
    }
    
    $.fn.throbbo = function(opts){
    
        return this.each(function(){
            _log('[jquery.throbbo] ' + this);
            opts = $.extend({}, defaultOpts, opts);
            
            if (opts.mode === 'wrap') {
                _wrap(this, opts);
            }
            else 
                if (opts.mode === 'overlay') {
                    _overlay($(opts.container), opts);
                }
        });
        
    };
    
})(jQuery);


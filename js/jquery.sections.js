/*
    jquery-sections
    A jQuery for creating sectioned content areas.
    George Lesica <glesica@gmail.com>
*/

(function($){

    // Set up the slideshow
    var init = function(options) {
        // Set up global variables
        var settings; // For storing default settings
    
        // Configure default settings
        var settings = {
            id                  : null, // For future use

            width               : null,
            height              : null,
            minwidth            : null,
            minheight           : null,
            maxwidth            : null,
            maxheight           : null,
            
            target              : 'body',
            sections            : {},

            containerclass      : '',
            activeclass         : 'active',

            hidecontent         : false,
        };
        
        // Update default settings with options passed in
        if (options) {
            $.extend(settings, options);
        }

        // Set up the container
        var $container = this
            .addClass('jqs-container ' + settings.containerclass)
            .width(settings.width)
            .height(settings.height)
            .css('min-width', settings.minWidth)
            .css('min-height', settings.minHeight)
            .css('max-width', settings.maxWidth)
            .css('max-height', settings.maxHeight)
            .append(
                $('<div />').addClass('jqs-titles')
            )
            .append(
                $('<div />').addClass('jqs-contents')
            );
        
        $container.data('activeclass', settings.activeclass);
        $container.data('sections', {});
        
        // Build the sections
        for (var title in settings.sections) {
            if (settings.sections.hasOwnProperty(title)) {
                var selector = settings.sections[title];
                var $links = $(settings.target).find(selector);
                
                var $content = $('<div />')
                    .addClass('jqs-content')
                    .hide();
                    
                // Build the list of links
                $linklist = $('<ul />');
                $links.clone().each(function() {
                    $next = $(this);
                    $linklist.append($('<li />').append($next));
                });
                
                $content.append($linklist);
                
                var $title = $('<div />')
                    .addClass('jqs-title')
                    .data('content', $content)
                    .html(title)
                    .click(function() {
                        toggle.call($container, $(this).html());
                    });
                    
                if (settings.hidecontent) {
                    $links.hide();
                }
                
                $container.data('sections')[title] = $title;
                
                // Add the section to the container
                $container.children('.jqs-titles').append($title);
                $container.children('.jqs-contents').append($content);
            }
        }
        
        return this;
    }
    
    // Control functions
    
    var hide = function(title) {
        var activeclass = this.data('activeclass');
        this.data('sections')[title]
        .removeClass(activeclass)
        .data('content')
        .slideUp('fast');
    }
    
    var hideAll = function() {
        var sections = this.data('sections');
        for (var title in sections) {
            if (sections.hasOwnProperty(title)) {
                hide.call(this, title);
            }
        }
    }
    
    var show = function(title) {
        var activeclass = this.data('activeclass');
        hideAll.call(this);
        this.data('sections')[title]
        .addClass(activeclass)
        .data('content')
        .slideDown('fast');
    }
    
    var toggle = function(title) {
        if (this.data('sections')[title].data('content').is(':visible')) {
            hide.call(this, title);
        } else {
            show.call(this, title);
        }
    }
    
    // Define available methods
    var methods = {
        init            : init,
    };
    
    $.fn.sections = function(method, options) {
        // Decide which method we're supposed to call and call it
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.headershow');
        }
    };
    
})(jQuery);



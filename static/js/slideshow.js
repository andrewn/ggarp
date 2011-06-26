define(['jquery', 'util'], function ($, util) {
     
    var Slideshow = function( container, opts ) {

        var opts = opts || {},
            defaults = {
                minimum: 10
            },
            container       = $( container ),
            thumbsContainer = container.find('.thumbnails'),
            thumbs          = thumbsContainer.children(),
            mainSlideContainer,
            slideManager,
            slides;
        
        // Apply defaults
        opts = $.extend( {}, defaults, opts );

        // Remove main images from document
        slide = container.find( '.main' ).remove();

        // Create a placeholder for the main image
        mainSlideContainer  = $('<div class="main-slide-container">'); 
        
        container.append( mainSlideContainer );

        slideManager = new SlideManager( mainSlideContainer );
                
        slide.children().each( function( index, slide ) {
            slideManager.add( $( slide ).attr('id'), slide );
        });
/*
        // Need carousel?
        var shouldUseCarousel = ( thumbs.length > opts.minimum ) ? true : false;
                        
        if ( shouldUseCarousel ) {
            new wk.Carousel( thumbsContainer, {
                itemsPerView: opts.minimum
            });
        }
  */      
        function slideIdFromUrl( url ) {
            var parts = url.split('/'),
                last  = parts[ parts.length - 1],
                id    = last.replace('#', '');
            return id;
        }

        // Set-up slide effects and click events on each item
        thumbs.each( function ( index, item ){
            var item = $( item );
            item.click(
                function (evt) {
                    thumbs.removeClass('selected');
                    
                    var slideId = slideIdFromUrl( item.children('a').attr('href') );
                    slideManager.show( slideId );
                    item.addClass( 'selected' );
                    return false;
                }
            );
        });
        
        checkIfImageShouldBeDisplayed( document.location.hash );
        
        function checkIfImageShouldBeDisplayed( hash ) {
            if ( hash ) {
                var match = hash.match(/#(.*)$/);
                var queryStringId = ( match.length > 1 ) ? match[1] : "";
                slideManager.show( queryStringId );
            } else {
                slideManager.showFirst();
                thumbs.first().addClass('selected');
            }
        }
        
        
        /**
          * SlideManager
          * @class
          */
        function SlideManager( el, opts ) {
                        
            var imageCache = {},
                imageContainer = $(el),
                firstImageId,
                opts = opts || {},
                defaults = {
                    durationIn: 200,
                    durationOut: 200
                };
                
            opts = $.extend( {}, defaults, opts );
            
            function add( id, img ) {                
                if (!firstImageId) { firstImageId = id; }
                imageCache[id] = img;
            }
            
            function get(id) {
                return imageCache[id] || null;
            }
            
            function show(id) {
                var item = get( id );      
                if ( item ) {
                    fadeOut(
                        imageContainer,
                        function () {
                            imageContainer.empty()
                                          .append(item);
                            fadeIn( imageContainer );
                        }
                    );
                }
            }
            
            function fadeOut( el, cb ) {
                util.fadeOut( el, { callback: cb, duration: opts.durationOut });
            }
            
           function fadeIn( el, cb ) {
               util.fadeIn( el, { callback: cb, duration: opts.durationIn });
           }
            
            return {
                get     : get,
                add     : add,
                show    : show,
                showFirst: function() {
                    show( firstImageId );
                },
                cache   : imageCache
            }
        }

    }
     
     return Slideshow;
});
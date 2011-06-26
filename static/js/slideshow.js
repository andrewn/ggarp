define(['jquery'], function ($) {
     
    var Slideshow = function( container, opts ) {

        var opts = opts || {},
            defaults = {
                minimum: 10
            },
            container       = $( container ),
            thumbsContainer = container.find('.thumbnails'),
            thumbs          = thumbsContainer.children(),
            mainImageContainer,
            imageManager,
            images;
        
        // Apply defaults
        opts = $.extend( {}, defaults, opts );

        // Remove main images from document
        images = container.find( '.main' ).remove();

        // Create a placeholder for the main image
        mainImageContainer  = $('<div class="main-image-container">'); 
        
        container.append( mainImageContainer );

        imageManager = new ImageManager( mainImageContainer );
                
        images.children().each( function( index, image ) {
            imageManager.add( $( image ).attr('id'), image );
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
        function imageIdFromUrl( url ) {
            var parts = url.split('/'),
                last  = parts[ parts.length - 1],
                id    = last.replace('#', '');
            return id;
        }

        // Set-up image effects and click events on each item
        thumbs.each( function ( index, item ){
            var item = $( item );
            item.click(
                function (evt) {
                    thumbs.removeClass('selected');
                    
                    var imageId = imageIdFromUrl( item.children('a').attr('href') );
                    imageManager.show( imageId );
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
                imageManager.show( queryStringId );
            } else {
                imageManager.showFirst();
                thumbs.first().addClass('selected');
            }
        }
        
        
        /**
          * ImageManager
          * @class
          */
        function ImageManager( el, opts ) {
                        
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
                            imageContainer.html( '<img src="' + item.src + '" />' );
                            fadeIn( imageContainer );
                        }
                    );
                }
            }
            
            function fadeOut( el, cb ) {
                console.log('fadeOut');
                if (typeof cb == 'function') { cb(); }
                //TODO: wk.util.fadeOut( el, { callback: cb, duration: opts.durationOut });
            }
            
           function fadeIn( el, cb ) {
               console.log('fadeIn');
               if (typeof cb == 'function') { cb(); }
               //TODO: wk.util.fadeIn( el, { callback: cb, duration: opts.durationIn });
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
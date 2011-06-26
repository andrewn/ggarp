define(['jquery', 'util'], function ($, util) {
    
    var KEY_RIGHT = 39,
        KEY_LEFT  = 37;

    var Slideshow = function( container, opts ) {

        var opts = opts || {},
            defaults = {
                minimum: 10
            },
            container       = $( container ),
            thumbsContainer = container.find('.thumbnails'),
            useKeyboardNav  = (opts.useKeyboardNav != null) ? opts.useKeyboardNav : true,
            mainSlideContainer,
            slideManager,
            slides;
        
        // Apply defaults
        opts = $.extend( {}, defaults, opts );

        // Remove main images from document
        slide = container.find( '.main' ).remove();

        // Flag to indicate slideshow is on
        container.addClass('slideshow');

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

        thumbManager = new ThumbManager(thumbsContainer);
        // jQuery silliness: bind to dom element to receive events
        thumbsContainer.bind('selected', function (evt, thumb) {            
            var slideId = slideIdFromUrl( $(thumb).children('a').attr('href') );
            slideManager.show( slideId );        
        });

        // Keyboard nav
        if (useKeyboardNav) {
            $(document).keyup(function(evt) {
               switch(evt.which) {
                   case KEY_RIGHT:  showSlide('next');
                                    break;
                   case KEY_LEFT:   showSlide('prev');
                                    break;
               }
            })
        }

        function showSlide(direction) {
            // var currentSlide = thumbs.filter('.selected');
            // console.log('currentSlide', currentSlide, thumbs);
            var currentSlide = slideManager.currentSlideId,
                newSlide;
            if ( direction == 'next' && slideManager.hasSlide(currentSlide + 1) ) {
                newSlide = currentSlide + 1;
                slideManager.show(newSlide);
                //thumbs.get(currentSlide).removeClass('selected');
                //thumbs.get(newSlide).addClass('selected');
            }
        }
        
        checkIfImageShouldBeDisplayed( document.location.hash );
        
        function checkIfImageShouldBeDisplayed( hash ) {
           // if ( hash ) {
           //     var match = hash.match(/#(.*)$/);
           //     var queryStringId = ( match.length > 1 ) ? match[1] : "";
           //     slideManager.show( queryStringId );
           //     thumbManager.show( queryStringId.replace('media-', '') );
           // } else {
                slideManager.showFirst();
                thumbManager.showFirst();
           // }
        }
        

        function ThumbManager(sel) {
            var container = $(sel),
                thumbs    = container.children(),
                current;

            // Set-up slide effects and click events on each item
            thumbs.each( function ( index, item ){
                var item = $( item );
                item.click(
                    function (evt) {
                        thumbs.removeClass('selected');
                        item.addClass('selected');

                        container.trigger('selected', item);
                        
                        return false;
                    }
                );
            });
            return {
                showFirst: function () {
                    this.show(0)
                },
                showNext: function () {
                    var next = current + 1;
                    if ( next < thumbs.length ) {
                        this.show(next)
                    }
                },
                showPrevious: function () {
                    var prev = current - 1;
                    if ( prev >= 0 ) {
                        this.show(prev)
                    }
                },
                show: function (index) {
                    thumbs.removeClass('selected');
                    if (thumbs.get(index)) {
                        $(thumbs.get(index)).addClass('selected');
                    }
                    current = index;
                }
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
                this.currentSlideId = id;
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
                hasSlide : function (id) {
    //console.log(id)  
                },
                cache   : imageCache
            }
        }

    }
     
     return Slideshow;
});
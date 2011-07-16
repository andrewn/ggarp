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
        slides = container.find( '.main' ).children().remove();

        // Flag to indicate slideshow is on
        container.addClass('slideshow');

        // Create a placeholder for the slides
        mainSlideContainer  = $('<div class="main-slide-container">'); 
        
        container.find( '.main' ).append( mainSlideContainer );

        slideManager = new SlideManager( mainSlideContainer );
                
        slides.each( function( index, slide ) {
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
            if ( direction == 'next') {
                thumbManager.showNext();
            } else if ( direction == 'prev') {
                thumbManager.showPrevious();
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
                //slideManager.showFirst();
                thumbManager.showFirst();
           // }
        }
        

        function ThumbManager(sel) {
            var container = $(sel),
                thumbs    = container.children(),
                self      = this,
                current;

            // Set-up slide effects and click events on each item
            thumbs.each( function ( index, item ){
                var item = $( item );
                item.click(
                    function (evt) {
                        show(index);
                        return false;
                    }
                );
            });

            function show (index) {
                var item = $(thumbs.get(index));
                thumbs.removeClass('selected');
                if (item.length > 0) {
                    item.addClass('selected');
                    container.trigger('selected', item);
                }
                current = index;
            }

            return {
                showFirst: function () {
                    show(0);
                },
                showNext: function () {
                    var next = current + 1;
                    if ( next < thumbs.length ) {
                        show(next);
                    }
                },
                showPrevious: function () {
                    var prev = current - 1;
                    if ( prev >= 0 ) {
                        show(prev);
                    }
                },
                show: show
            }
        }
        
        /**
          * SlideManager
          * @class
          */
        function SlideManager( el, opts ) {
 
            FRONT = 20;
            BACK  = 10;
                        
            var imageCache = {},
                imageContainer = $(el),
                backSlide  = $('<div class="a"></div>').css('z-index', BACK),
                frontSlide = $('<div class="b"></div>').css('z-index', FRONT),
                firstImageId,
                opts = opts || {},
                defaults = {
                    durationIn: 200,
                    durationOut: 200
                };

            opts = $.extend( {}, defaults, opts );
            
            imageContainer.append(backSlide);
            imageContainer.append(frontSlide);

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

                    // Load item behind current
                    backSlide.empty().append(item) //.show();

                    fadeOut(
                        frontSlide,
                        function () {

                            frontSlide.css('opacity', 0);

                            var tmp = frontSlide;
                            frontSlide = backSlide;
                            frontSlide.css('z-index', FRONT);
                            backSlide = tmp;
                            backSlide.css('z-index', BACK);

                            backSlide.css('opacity', 1)
                        }
                    );

                    //fadeOut(
                    //    imageContainer,
                    //    function () {
                    //        imageContainer.empty()
                    //                      .append(item);
                    //        fadeIn( imageContainer );
                    //    }
                    //);
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

require(['jquery', 'slideshow'], function( $, Slideshow ) {
  
  $(document).ready(function() {
    initMoreInfo();
    initSlideshow();
  });

   function initMoreInfo() {
        var moreInfoControl = $('.more-info'),
            moreInfoContent = $('.more');

        moreInfoControl.click(function(evt){
            moreInfoContent.toggle('fast');
            return false;
        });       
   }

   function initSlideshow() {
       new Slideshow('#gallery');
   }

});
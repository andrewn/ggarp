
require(['jquery'], function( $ ) {
  
  $(document).ready(function() {
    initMoreInfo();
  });

   function initMoreInfo() {
        var moreInfoControl = $('.more-info'),
            moreInfoContent = $('.more');

        moreInfoControl.click(function(evt){
            moreInfoContent.toggle('fast');
            return false;
        });       
   }

});
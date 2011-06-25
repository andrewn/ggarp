
require(['jquery'], function( $ ) {
    
   $(document).ready(function() {

        var moreInfoControl = $('.more-info'),
            moreInfoContent = $('.more');

        moreInfoControl.click(function(evt){
            moreInfoContent.toggle('fast');
            return false;
        });
   });

});
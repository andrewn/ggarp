define(['jquery'], function ($) {
    return {
        fadeOut: function (sel, opts) {
            var el          = $(sel),
                duration    = opts.duration || 0,
                callback    = opts.callback || null;
            el.animate({ opacity: 0 },duration, callback) 
        },
        fadeIn: function (sel, opts) {
            var el          = $(sel),
                duration    = opts.duration || 0,
                callback    = opts.callback || null;
            el.animate({ opacity: 1 },duration, callback);
        }
    }
});
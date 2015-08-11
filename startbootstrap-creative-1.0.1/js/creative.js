/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

var sc_query_url = 'https://api.soundcloud.com/tracks?client_id=c7e286fe6e5cdc8424f2bf68c2ff14a7&q=';
var widget_base_url = 'http://api.soundcloud.com/tracks/';
var widget_url_extension = '&visual=true&hide_related=true&show_comments=false';

$(document).ready(function() {
    $('#sc-widget').hide();
});

(function($) {
    "use strict"; // Start of use strict

    var widget1;
    $.getScript('https://w.soundcloud.com/player/api.js', function() {
        var iframeElement = document.querySelector('iframe');
        var iframeElementID = iframeElement.id;
        widget1 = SC.Widget(iframeElement);
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    $('#listn-btn').on('click', function(event) {
        $('#main_search').prop('disabled', true);
        var query = document.getElementById('main_search').value;
        var url = sc_query_url + query + '&embeddable_by=all&limit=1';
        var track_id;
        var dfrd1 = $.Deferred();
        $.getJSON(url, function(tracks) {
            track_id = tracks[0]['id'];
            console.log(track_id);
            widget1.load(widget_base_url + track_id + widget_url_extension, {auto_play:true});
            dfrd1.resolve();
        });
        $.when(dfrd1).done(function(){
            $('#main_search').hide();
            $('#sc-widget').show();
        });
    })

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

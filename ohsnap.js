/**
* == OhSnap!.js ==
* A simple jQuery/Zepto notification library designed to be used in mobile apps
*
* author: Justin Domingue
* date: september 18, 2015
* version: 1.1.0
* copyright: MIT License (MIT)
#####################################################################################
CHANGELOG:
- 2023/01/04 - added title, optimized for tailwind
#####################################################################################
*/

/**
 * Shows a toast on the page
 *
 * @param string text - text to show
 * @param {
*      title: alert title. Default: null
*      color: alert will have class 'alert-color'. Default: null
*      icon: class of the icon to show before the alert. Default: null
*      duration: duration of the notification in ms. Default: 5000ms
*      container: wrapper element for all the alerts. Example: #some-class, .a-class, etc. Default: body
*      fade-duration: duration of the fade in/out of the alerts. Default: 'fast'
* } options - object that can override the following options
*
*/
export function ohSnap(text, options) {
    var defaultOptions = {
        'title': null,
        'color': 'base',
        'icon': null,
        'duration': 7000,
        'container': 'body',
        'fade-duration': 'fast'
    }

    options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;

    var $container = $(options['container']),
        icon_markup = "",
        color_markup = "",
        title = "";

    if (options.color) {
        color_markup = 'ohsnap-' + options.color;
        if (options.icon === null) {
            switch (options.color) {
                case 'error':
                    options.icon = 'bug';
                    break;
                case 'warning':
                    options.icon = 'triangle-exclamation';
                    break;
                case 'success':
                    options.icon = 'thumbs-up';
                    break;
                default:
                    options.icon = 'bell';
                    break;
            }
        }
    }

    if (options.icon) {
        icon_markup = "<i class='fas fa-" + options.icon + "'></i> ";
    }

    if (options.title) {
        title = '<h4 class="title">' + options.title + '</h4>';
    }

    // Generate the HTML
    //   var html = $('<div class="alert ' + color_markup + '">' + icon_markup + text + '</div>').fadeIn(options['fade-duration']);
    var html = $('<div class="ohsnap-wrapper">' +
        '<div class="ohsnap-container ' + color_markup + '">' +
        '<div class="content">' +
        title +
        '<p>' + text + '</p>' +
        '</div>' +
        '<div class="icon">' +
        icon_markup +
        '</div>' +
        '</div>' +
        '</div>'); //.fadeIn(options['fade-duration']);

    // Append the label to the container
    $container.append(html);

    // Remove the notification on click
    html.on('click', function (e) {
        ohSnapX($(this));
    });

    // After 'duration' seconds, the animation fades out
    if (options.duration != 0) {
        setTimeout(function () {
            ohSnapX(html);
        }, options.duration);
    } else {
        $('.ohsnap-wrapper').on('click', (e) => {
            ohSnapX(html);
        });
    }
}

/**
* Removes a toast from the page
* Called without arguments, the function removes all alerts
*
* @param string element - a jQuery object to remove
* @param {
*      duration: duration of the alert fade out - 'fast', 'slow' or time in ms. Default 'fast'
* } options
*/
export function ohSnapX(element, options) {
    var defaultOptions = {
        'fade-duration': 'fast'
    }

    options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;

    if (typeof element !== "undefined") {
        element.fadeOut(options['fade-duration'], function () {
            $(this).remove();
        });
    } else {
        $('.ohsnap-wrapper').fadeOut(options['fade-duration'], function () {
            $(this).remove();
        });
    }
}
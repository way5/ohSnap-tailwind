/*
 * ###################################################################################
 *  File: ohsnap.js
 *  File Created: Thursday, 3rd August 2023 5:36:14 pm
 *  Author: Sergey Ko
 *  Last Modified: Thursday, 3rd August 2023 10:55:38 pm
 *  Modified By: Sergey Ko
 *  License: MIT License (MIT)
 *  Original author: Justin Domingue
 * ###################################################################################
 *  CHANGELOG:
 * - 2023/01/04 - added title, optimized for tailwind
 * - 2023/03/08 - optimization + new features
 * ###################################################################################
 */

/**
 * Shows a toast on the page
 *
 * @param string text to show
 * @param object {
 *      title: alert title. Default: undefined
 *      color: alert will have class 'ohsnap-color'. Default: 'success'
 *      styles: object ex.: {'bg': 'bg-color dark:bg-color','border': 'border-color dark:border-color', 'icon': 'bg-color dark:bg-color'}
 *                where border is optional. Default: undefined
 *      icon: FontAwesome icon name that contains icon background image. Default: undefined (no icon is shown)
 *      duration: how long alert would be displayed in ms. Default: 7000ms
 *      container: wrapper element for all the alerts. Example: #some-class, .a-class, etc. Default: body
 *      fadein: duration of the fadeIn. Default: 'fast'
 *      fadeout: duration of the fadeOut. Default: 'fast'
 *      top: initial vertical offset in pixels
 *      right: initial horizontal offset in pixels
 *      type: how to display the sequence of onSnaps (linear | isostack | vstack)
 * }
*
*/
export function ohSnap(text, options) {
    var defaultOptions = {
        'title': undefined,
        'color': undefined,
        'styles': undefined,  // {'bg': 'bg-color dark:bg-color','border': 'border-color dark:border-color', 'icon': 'bg-color dark:bg-color'}
        'icon': undefined,
        'duration': 7000,
        'container': 'body',
        'fadein': 'fast',
        'fadeout': 'fast',
        'top': 36,
        'right': 36,
        'type': 'isostack'       // linear | isostack | vstack
    }

    options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;

    var $container = $(options['container']),
        color_markup = "",
        icon_markup = "",
        title = "";

    if(options.styles === undefined) {
        color_markup = 'ohsnap-' + options.color;
    } else {
        color_markup = options.styles.bg;
        if(options.styles.border !== undefined)
            color_markup += ' border ' + options.styles.border;
    }

    if (options.title !== undefined) {
        title = '<h4 class="title">' + options.title + '</h4>';
    }

    if(options.icon !== undefined) {
        icon_markup = '<i class="fas fa-"'+options.icon + '"></i>';
    }

    // how many are already displayed
    $('.ohsnap-wrapper').each((i, e) => {
        let t = 1.1, r = 0;
        if(options.type === 'isostack') {
            t = 0.1;
            r = 0.03;
        } else if(options.type === 'vstack')
            t = 0.2;
        options.top += Math.round($(e).height() * t);
        options.right += Math.round($(e).width() * r);
    });

    // Generate the HTML
    const html = $('<div>', { 'class': 'ohsnap-wrapper', 'style': 'top:' + options.top + 'px;right:' + options.right +'px' });
    const d0 = $('<div>', {'class': 'ohsnap-container ' + color_markup});
    const d1 = $('<div>', {'class': 'content'});
    d1.html(title + '<p>' + text + '</p>');
    d0.append(d1);
    if(options.icon || options.styles.icon) {
        const d2 = $('<div>', {'class': 'icon-wrapper ' + (options.styles !== undefined && options.styles.icon !== undefined
                    ? options.styles.icon : '')});
        if(icon_markup !== "")
            d2.html(icon_markup);
        d2.addClass(options.icon);
        d0.append(d2);
    }
    html.append(d0).hide();

    // Append the label to the container
    $container.append(html);
    html.fadeIn(options['fadein']);

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
        'fadeout': 'fast'
    };

    options = (typeof options == 'object') ? $.extend(defaultOptions, options) : defaultOptions;

    if (typeof element !== "undefined") {
        element.fadeOut(options['fadeout'], function () {
            $(this).remove();
        });
    } else {
        $('.ohsnap-wrapper').fadeOut(options['fadeout'], function () {
            $(this).remove();
        });
    }
}
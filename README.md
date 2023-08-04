Notification library based on OhSnap!.js
=========

A simple jQuery/Zepto library originally designed by **[Justin Domingue](https://github.com/justindomingue)**

## Installation

Dependencies: 

```bash
yarn add jquery
```
or
```bash
yarn add zepto
```
optional
```bash
yarn add @fortawesome/fontawesome-free
```

Download **ohSnap** using Yarn: 
```bash
yarn add way5/ohsnap-tailwind
```

## Usage

Import ohSnap:

```javascript
import "ohsnap-tailwind/ohsnap.scss";
import {ohSnap, ohSnapX} from "ohsnap-tailwind";
```

Default options:

```javascript
{
    "title": undefined,                 // alert title. Default: undefined
    "color": undefined,                 // alert will have class 'ohsnap-color'. Default: 'success'
    "styles": undefined,                // object ex.: {'bg': 'bg-color dark:bg-color','border': 'border-color dark:border-color', 
                                        // 'icon': 'bg-color dark:bg-color'} where border and icon are optional. Default: undefined  (no icon is shown)
    "icon": undefined,                 // FontAwesome icon name that contains icon background image. Default: undefined (no icon is shown)
    "duration": 7000,                   // how long alert would be displayed in ms. Default: 7000ms
    "container": 'body',                // wrapper element for all the alerts. Example: #some-class, .a-class, etc. Default: body
    "fadein": 400,                      // duration of the fadein. Default: 'fast'
    "fadeout": 'slow',                  // duration of the fadeOut. Default: 'fast'
    "top": 36,                          // initial vertical offset in pixels
    "right": 36,                        // initial horizontal offset in pixels
    "type": 'linear'                    // how to display the sequence of onSnaps (linear | isostack | vstack)
}
```

Example:

```javascript
{
    "title": "Notification",
    "styles": {
        "bg": "yellow-500",
        "border": "yellow-700",
        "icon": "info-icon bg-white bg-[length:28px_28px] bg-no-repeat bg-center"
    },
    "duration": 5000,
    "fadeout": "fast"
}
```

of with FontAwesome:

```javascript
{
    "title": "Notification",
    "styles": {
        "bg": "yellow-500",
        "border": "yellow-700",
    },
    "icon": "bell",
    "duration": 3000,
    "fadein": "fast"
}
```

To call a notification, use `ohSnap(text, options)`. Examples :

```javascript
ohSnap('Succefully created your account');
ohSnap('Oh Snap! I cannot process your card...', {'styles': { 'bg': 'red-500', 'icon': 'pizza-slice'}});
ohSnap('Yeeaahh! You are now registered.', {'duration': 2000});
```

To remove particular notification use `ohSnapX(ohsnap-wrapper-element)`, or `ohSnapX()` to remove them all.

Alerts are automatically bound to a click event (internally, `ohSnapX()` is called when the alert is clicked).

### Styling

- **tailwind.conf.js**

```javascript
...
module.exports = {
    ...
    safelist: [
        {
            // specify background colors that would always be loaded
            pattern: /bg-(yellow|green|indigo|red)-500/,
        }, {
            // specify border colors that would always be loaded
            pattern: /border-(yellow|green|indigo|red)-600/,
        }
    ],
    theme: {
        colors: {
            ...
            "yellow": {
                50: "#fffde7",
                100: "#fff9c4",
                200: "#fff59d",
                300: "#fff176",
                400: "#ffee58",
                500: "#ffeb3b",
                600: "#fdd835",
                700: "#fbc02d",
                800: "#f9a825",
                900: "#f57f17",
            },
            "green": {
                50: "#e8f5e9",
                100: "#c8e6c9",
                200: "#a5d6a7",
                300: "#81c784",
                400: "#66bb6a",
                500: "#4caf50",
                600: "#43a047",
                700: "#388e3c",
                800: "#2e7d32",
                900: "#1b5e20",
            },
            "indigo": {
                50: "#e8eaf6",
                100: "#c5cae9",
                200: "#9fa8da",
                300: "#7986cb",
                400: "#5c6bc0",
                500: "#3f51b5",
                600: "#3949ab",
                700: "#303f9f",
                800: "#283593",
                900: "#1a237e",
            },
            "red": {
                50: "#ffebee",
                100: "#ffcdd2",
                200: "#ef9a9a",
                300: "#e57373",
                400: "#ef5350",
                500: "#f44336",
                600: "#e53935",
                700: "#d32f2f",
                800: "#c62828",
                900: "#b71c1c",
            },
            ...
        }
    }
}
```

- See: [ohsnap.scss](./ohsnap.scss)
OhSnap!.js
=========

> Oh Snap ! The server crashed... Try again later :D

A simple jQuery/Zepto notification library designed to be used in mobile apps by **[Justin Domingue](https://github.com/justindomingue)**

Check out this [demo page](http://justindomingue.github.io/ohSnap/ "Demo")

## Installation
-----

Dependency: [jQuery](http://jquery.com) or [Zepto](http://zeptojs.com).

Download ohSnap.js:
- from [Github](https://raw.githubusercontent.com/way5/ohSnap-tailwind/tailwind/ohsnap.js)
- with Yarn: <code>yarn add oh-snap</code>

## Usage
-----

Within your js:

```javascript
import {ohSnap, ohSnapX} from "ohsnap.js";
```

Default options:

```javascript
{
    "title": "",
    "color": "base",
    "icon": "bell",     // Font Awesome icon name without  "fa-" (ex: fa-bell -> bell)
    "duration": 7000,   // time is ms
    "container": "body", // ex: "#ohsnap", ".ohsnap", etc
    "fade-duration": "fast"
}
```

To call a notification, use `ohSnap(text, options)`. Examples :

```javascript
ohSnap('Succefully created your account');
ohSnap('Oh Snap! I cannot process your card...', {color: 'red', icon: 'pizza-slice'});
ohSnap('Yeeaahh! You are now registered.', {duration: 2000});
```

To remove a notification, use `ohSnapX()`.

Alerts are automatically bound to a click event (internally, `ohSnapX()` is called when the alert is clicked).

### Styling

- **tailwind.conf.js**

```javascript
...
module.exports = {
    ...
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
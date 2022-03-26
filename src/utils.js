/**
 * Adds a css string to the global styles 
 * @param  {strings} css
 */
export function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css.replace(/;/g, ' !important;');
    head.appendChild(style);
}


/**
 * Generates an Array of Parameters found in the given URL
 * @date 2022-03-25
 * @param {string} url
 * @returns {any}
 */
export function getQueryStringParameters(url) {

    var urlParams = {},
        match,
        additional = /\+/g, // Regex for replacing additional symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(additional, " ")); },
        query;
    if (url) {
        if (url.split("?").length > 0) {
            query = url.split("?")[1];
        }
    } else {
        url = window.location.href;
        query = window.location.search.substring(1);
    }
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
}


/**
 * Find a specific GET-Parameter in the current Location
 * @date 2022-03-25
 * @param {string} parameterName
 * @returns {string}
 */
export function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

/**
 * Checks if the current location has a specific page query parameter
 * @date 2022-03-25
 * @param {string} pageQuery
 * @returns {boolean}
 */
export function isPage(pageQuery) {
    return findGetParameter("page") == pageQuery
}


/**
 * Map for Math.floor()
 * @date 2022-03-25
 * @param {number} value
 * @returns {number}
 */
export function floor(value) {
    return Math.floor(value)
}

/**
 * Get Human readable time duration string
 * @date 2022-03-25
 * @param {number} diff - Timestamp
 * @returns {string}
 */

const unitmapping = {
    "days": 24 * 60 * 60 * 1000,
    "hours": 60 * 60 * 1000,
    "minutes": 60 * 1000,
    "seconds": 1000
};

export function getHumanizedDiff(diff) {
    return (floor(diff / unitmapping.days) > 0 ? floor(diff / unitmapping.days) + " days " : "") +
        (floor((diff % unitmapping.days) / unitmapping.hours) > 0 ? floor((diff % unitmapping.days) / unitmapping.hours) + " hours " : "") +
        (floor((diff % unitmapping.hours) / unitmapping.minutes) > 0 ? floor((diff % unitmapping.hours) / unitmapping.minutes) + " minutes " : "") +
        (floor((diff % unitmapping.minutes) / unitmapping.seconds) > 0 ? floor((diff % unitmapping.minutes) / unitmapping.seconds) + " seconds " : "");
}


/**
 * Removes Newline and Tab characters from String
 * @date 2022-03-25
 * @param {any} input
 * @returns {any}
 */
export function removeNewlinesAndTabs(input) {
    if (typeof input === 'string' || input instanceof String)
        return input.replace(/[\r\n\t]/g, "");

    return "";
}

export function basename(path) {
    if (path == undefined)
        return ""

    return path.split('/').reverse()[0];
}

// map our commands to the classList methods
const fnmap = {
    'toggle': 'toggle',
    'show': 'add',
    'hide': 'remove'
};

export const collapse = (selector, cmd) => {
    const targets = Array.from(document.querySelectorAll(selector));
    targets.forEach(target => {
        target.classList[fnmap[cmd]]('show');
    });
}

export function setupTriggers() {
    // Grab all the trigger elements on the page
    const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

    // Listen for click events, but only on our triggers
    window.addEventListener('click', (ev) => {
        const elm = ev.target;
        if (triggers.includes(elm)) {
            const selector = elm.getAttribute('data-target');
            collapse(selector, 'toggle');
        }
    }, false);
}

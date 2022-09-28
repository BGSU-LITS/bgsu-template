/**
 * Adds various LibCal hours widgets to a page.
 * @modules libcal
 */

import cssLibcal from './scss/libcal.scss';
import pugLibcal from './pug/libcal.pug';
import pugLibcalSelect from './pug/libcal/select.pug';

/**
 * Callback function after data has been retrieved from LibCal API.
 * @callback getCallback
 * @param {Object} data Data retrieved from LibCal API.
 */

/**
 * Get data from the LibCal API.
 * @param {number} iid Institution ID to get.
 * @param {number} lid Library ID to get.
 * @param {Object} config Configuration of the API request.
 * @param {string} [config.mode] Can be specified as "week" to retrieve data
 *    for weeks at a time. Otherwise data for a single day is retrieved.
 * @param {string} [config.weeks] In week mode, specifies number of weeks to
 *    get from the API.
 * @param {string} [config.format] Specifies an alternate value for the API's
 *    format parameter. If not specified, defaults to "json".
 * @param {getCallback} callback Function called after data has been retrieved.
 */
export function get(iid, lid, config, callback) {
    let url = `https://api3.libcal.com/api_hours_${
        config.mode === 'week' ? 'grid' : 'today'
    }.php?format=${
        config.format || 'json'
    }&systemTime=0&iid=${iid}&lid=${lid}`;

    if (config.mode === 'week' && config.weeks) {
        url += `&weeks=${config.weeks}`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => callback(data));
}

/**
 * Callback function after widgets have been inserted.
 * @callback insertCallback
 * @param {Element} element The element the widget was inserted into.
 * @param {Object} css CSS injected into the page, to look up class names.
 */

/**
 * Insert a widget into a element in the page.
 * @param {Object[]} locations Locations data obtained from LibCal API.
 * @param {Object} css CSS injected into the page, to look up class names.
 * @param {Object} pug Pug to inject into the element.
 * @param {string} selector Selector of element to inject pug into.
 * @param {Object} config Configuration for the widget.
 * @param {insertCallback} [config.callback] Function called after the widget
 *    has been added to the page.
 */
export function insert(locations, css, pug, selector, config) {
    const search = new URLSearchParams(window.location.search);

    document.querySelectorAll(selector).forEach((element) => {
        element.innerHTML = pug({
            locations, search, config, css,
        });

        if (config.callback) {
            config.callback(element, css);
        }
    });
}

/**
 * Sets up JSON-LD hours data on a page.
 * @param {number} iid Institution ID of the hours data.
 * @param {number} lid Library ID of the hours data.
 * @param {string} [name] Department name to narrow the data to.
 */
export function jsonld(iid, lid, name = '') {
    get(iid, lid, { format: 'jsonld', mode: 'week' }, (data) => {
        // If a name is specified, make the data for that department only.
        if (name) {
            Object.assign(data, data.department.find(
                (department) => department.name === name,
            ));

            delete data.department;
        }

        // Append the JSON-LD data as a script element to the end of the body.
        const script = document.createElement('script');

        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);

        document.body.append(script);
    });
}

/**
 * Sets up a form to select among LibCal hours departments.
 * @param {string} selector Selector of element to set form as content.
 * @param {number} iid Institution ID of the form.
 * @param {number} lid Library ID of the form.
 * @param {Object} [config] Configuration for the form.
 * @param {boolean} [config.all] Set to true to display a
 *    "All Locations - Weekly" option and add " - Monthly" to the end of the
 *    other options.
 * @param {insertCallback} [config.callback] Function called after the form
 *    has been added to the page.
 */
export function select(selector, iid, lid, config = {}) {
    get(iid, lid, config, (data) => {
        insert(
            data.locations,
            cssLibcal,
            pugLibcalSelect,
            selector,
            config,
        );

        // Set the form to automatically submit when value is changed.
        const form = document.getElementById(cssLibcal.libcal_select);

        form.querySelector('select').addEventListener('change', () => {
            const submit = document.createElement('input');

            submit.type = 'submit';
            submit.hidden = true;

            form.append(submit);
            submit.click();
            submit.remove();
        });
    });
}

/**
 * Sets up a LibCal hours widget.
 * @param {string} selector Selector of element to set widget as content.
 * @param {number} iid Institution ID of the widget.
 * @param {number} lid Library ID of the widget.
 * @param {Object} [config] Configuration for the widget.
 * @param {string} [config.mode] Can be specified as "week" to retrieve data
 *    for weeks at a time. Otherwise data for a single day is retrieved. If
 *    specified as "home" alters output for the UL homepage.
 * @param {string} [config.weeks] In week mode, specifies number of weeks to
 *    get from the API.
 * @param {string} [config.title] Title text for the widget, otherwise defaults
 *    to "This Week’s Hours" in "week" mode, or "Today’s Hours".
 * @param {string} [config.link] URL to link to full hours.
 * @param {number} [config.location] Location ID to limit display to.
 * @param {boolean} [config.all] Set to true to display all locations
 *    regardless of type, otherwise only libraries may be displayed.
 * @param {insertCallback} [config.callback] Function called after the widget
 *    has been added to the page.
 */
export function setup(selector, iid, lid, config = {}) {
    get(iid, lid, { weeks: 1, ...config }, (data) => insert(
        data.locations || Object.values(data),
        cssLibcal,
        pugLibcal,
        selector,
        config,
    ));
}

/**
 * Adds a proactive notification box to webpages for LibChat.
 * @modules libchat
 */

import css from './scss/libchat.scss';
import pug from './pug/libchat.pug';

// Load existing cookie to ignore notification.
let ignore = document.cookie.match(
    /(^|;)\s*bgsu-libchat-dismiss\s*=\s*true($|;)/,
);

/**
 * Move an existing chat notification to a given offset.
 * @param {string} [x] X-offset to move to as CSS unit, default 0.
 * @param {string} [y] Y-offset to move to as CSS unit, default 0.
 */
export function move(x = 0, y = 0) {
    const chat = document.getElementById(css.libchat);

    if (chat) {
        chat.setAttribute('style', `transform:translate(${x},${y})`);
    }
}

/**
 * Try to avoid another element if present by Y-offsetting notification.
 * @param {string} selector CSS selector for element to avoid.
 */
export function avoid(selector) {
    // Locate element to avoid if present.
    const element = document.querySelector(selector);

    if (!element) {
        return;
    }

    // Will move the y-offset above the height of the element to avoid.
    const avoidElement = () => {
        move(0, element.offsetHeight ? `-${element.offsetHeight}px` : 0);
    };

    // See if the element needs to be avoided, and add checks for attributes
    // of the element to avoid being changed or the window being resized.
    avoidElement();
    (new MutationObserver(avoidElement)).observe(element, { attributes: true });
    window.addEventListener('resize', avoidElement);
}

/**
 * Close the proactive chat notificaiton.
 * @param {boolean} [dismiss] Set cookie to prevent future notifications.
 */
export function close(dismiss = false) {
    // Locate existing notification and remove from document if found.
    const chat = document.getElementById(css.libchat);

    if (chat) {
        chat.remove();
    }

    // If specified, prevent notification from appearing on future pages.
    if (dismiss) {
        document.cookie = 'bgsu-libchat-dismiss=true; path=/';

        // Prevent the notification from reappearing on current page.
        ignore = true;
    }
}

/**
 * Open a chat instance in a popup window.
 * @param {string} href URL of the page to be opened.
 * @param {string} features Features of the popup window.
 * @return {boolean} Specifies if the popup was not opened successfully.
 */
export function open(href, features) {
    // Close the proactive chat notification on this page.
    close();

    // Prevent the notification from reappearing on current page.
    ignore = true;

    // Open the URL in a popup window if possible, returning true on failure.
    return !window.open(href, 'libchat', features);
}

/**
 * Checks and displays the proactive chat notification if chat is available.
 * @param {string} href URL of the page to be opened in the popup.
 * @param {number} iid The iid of the widget to monitor.
 * @param {Object} [rules] The rules of which users or departments to monitor.
 * @param {Object} [config] Configuration values for the notification.
 * @param {string} [config.url] The URL for widget_status without paramters.
 * @param {string} [config.title] Title of notification if not the default.
 * @param {string} [config.body] HTML body of notification if not the default.
 * @param {string} [config.message] Message used as part of the body if html
 *    was not configured above and not the default.
 * @param {string} [config.accept] Text for the button to accept the chat.
 * @param {string} [config.decline] Text for the button to decline the chat.
 * @param {number} [config.width] Width of the popup window if not default.
 * @param {number} [config.height] Height of the popup window if not default.
 * @param {string} [config.avoid] Selector for element to avoid overlaying.
 */
export function check(href, iid, rules = [], config = {}) {
    // Add default settings to the config.
    config.url = config.url || 'https://chat-us.libanswers.com/widget_status';

    const resource = `${config.url}?iid=${iid}&rules=${
        encodeURIComponent(JSON.stringify(rules))
    }`;

    // Request chat status for given iid and rules.
    fetch(resource).then((response) => {
        // Do nothing if the notification is being ignored.
        if (ignore) {
            return;
        }

        // Do nothing if the response is not okay.
        if (!response.ok) {
            return;
        }

        response.json().then((data) => {
            // Check that chat is online.
            if (data.u || data.d || data.c) {
                // Check that a notification is not already added to the page.
                if (!document.getElementById(css.libchat)) {
                    // Add the HTML for the notification to the page.
                    document.body.insertAdjacentHTML(
                        'beforeend',
                        pug({ config, css, href }),
                    );

                    move();

                    if (config.avoid) {
                        avoid(config.avoid);
                    }
                }

                // Return early to prevent closing the notification.
                return;
            }

            // Close the notification, as chat is unavaialble.
            close();
        });
    });
}

/**
 * Sets up a proactive chat notification monitor on the current page.
 * @param {string} href URL of the page to be opened in the popup.
 * @param {number} iid The iid to monitor.
 * @param {Object} [rules] The rules of which users or departments to monitor.
 * @param {Object} [config] Configuration values for the notification.
 * @param {string} [config.url] The URL for widget_status without paramters.
 * @param {number} [config.wait] Time in seconds to wait before display.
 * @param {string} [config.title] Title of notification if not the default.
 * @param {string} [config.body] HTML body of notification if not the default.
 * @param {string} [config.message] Message used as part of the body if html
 *    was not configured above and not the default.
 * @param {string} [config.accept] Text for the button to accept the chat.
 * @param {string} [config.decline] Text for the button to decline the chat.
 * @param {number} [config.width] Width of the popup window if not default.
 * @param {number} [config.height] Height of the popup window if not default.
 * @param {string} [config.avoid] Selector for element to try to avoid.
 */
export function setup(href, iid, rules = [], config = {}) {
    // Do nothing if the notification is being ignored.
    if (ignore) {
        return;
    }

    // Wait for the specified number of seconds (or 15 by default).
    setTimeout(
        () => {
            // After waiting, check the status of the chat.
            check(href, iid, rules, config);

            // Reset the delay to a minute and rerun the setup.
            config.wait = 60;
            setup(href, iid, rules, config);
        },
        (config.wait || 15) * 1000,
    );
}

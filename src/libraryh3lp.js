/**
 * LibraryH3lp Proactive Chat
 * @module libraryh3lp
 */

import css from './css/libraryh3lp.css';
import pug from './pug/libraryh3lp.pug';

/**
 * Ignore any proactive chat notifications, enabled if shhhh cookie is set.
 * @type {boolean}
 */
export var ignore = document.cookie.match(
    /(^|;)\s*libraryh3lp-shhhh\s*=\s*true($|;)/
);

/**
 * Close the proactive chat notificaiton.
 * @param {boolean} [shhhh] Set shhhh cookie to prevent future notifications.
 */
export function close(shhhh = false) {
    // Locate existing notification and remove from document if found.
    var element = document.getElementById(css.libraryh3lp);

    if (element) {
        element.parentNode.removeChild(element);
    }

    // If specified, prevent notification from appearing on future pages.
    if (shhhh) {
        document.cookie = 'libraryh3lp-shhhh=true; path=/';

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
    return !window.open(href, 'libraryh3lp', features);
}

/**
 * Sets up a proactive chat notification monitor on the current page.
 * @param {string} user The user or queue name to monitor.
 * @param {boolean} [queue] If true, the user specified is a queue name.
 * @param {Object} [config] Configuration values for the notification.
 * @param {number} [config.wait] Time in seconds to wait before display.
 * @param {string} [config.title] Title of notification if not the default.
 * @param {string} [config.body] HTML body of notification if not the default.
 * @param {string} [config.message] Message used as part of the body if html
 *  was not configured above and not the default.
 * @param {string} [config.accept] Text for the button to accept the chat.
 * @param {string} [config.decline] Text for the button to decline the chat.
 * @param {string} [config.color] CSS color of the buttons on the notificaiton
 *  if not the default of brown. Should have adequate contrast with white text.
 * @param {number} [config.skin] ID number of the skin to use for the popup
 *  window if not using the default skin.
 * @param {number} [config.width] Width of the popup window if not default.
 * @param {number} [config.height] Height of the popup window if not default.
 */
export function setup(user, queue = false, config = {}) {
    // Do nothing if the notification is being ignored.
    if (ignore) {
        return;
    }

    // Determine the domain name of the server.
    var server = queue ? 'chat.libraryh3lp.com' : 'libraryh3lp.com';

    // Create a new script element to check the user's status.
    var script = document.createElement('script');

    script.async = true;
    script.src = 'https://libraryh3lp.com/presence/jid/' +
        user + '/' + server + '/js';

    // Set a function to process the result once the script is loaded.
    script.onload = function() {
        // Remove the script element previously added from the page.
        document.body.removeChild(script);

        // Do nothing if the notification is being ignored.
        if (ignore) {
            return;
        }

        // Check that a status was obtained by the script.
        if (typeof window.jabber_resources[0].show !== 'undefined') {
            // Check that the status is either "chat" or "available".
            var status = window.jabber_resources[0].show;

            if (status === 'chat' || status === 'available') {
                // Check that a notification is not already added to the page.
                if (!document.getElementById(css.libraryh3lp)) {
                    // Add the HTML for the notification to the page.
                    document.body.insertAdjacentHTML('beforeend', pug({
                        href: 'https://libraryh3lp.com/chat/' +
                            user + '@' + server,
                        config: config,
                        css: css
                    }));
                }

                // Return early to prevent closing the notification.
                return;
            }
        }

        // Close the notification, as chat is unavaialble.
        close();
    };

    // Wait for the specified number of seconds (or 15 by default).
    setTimeout(
        function() {
            // After waiting, add the script to the page.
            document.body.appendChild(script);

            // Reset the delay to a minute and rerun the setup.
            config.wait = 60;
            setup(user, queue, config);
        },
        (config.wait || 15) * 1000
    );
}

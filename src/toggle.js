/**
 * Toggles display of a section of a site via a button.
 * @modules toggle
 */

import AccessibleToggle from 'accessible-toggle';
import css from './scss/toggle.scss';

/**
 * Sets up one element to toggle another element's display.
 * @param {string} selector Selector used to identify controlling elements. The
 *    elements should have a data-toggle attribute with the ID of the element
 *    that is toggled.
 * @param {Object} [config] Additional configuration values, see:
 *    https://github.com/elivz/accessible-toggle#configuration
 */
export function setup(selector = '[data-toggle]', config = {}) {
    // Loop through all controlling elements.
    document.querySelectorAll(selector).forEach((toggleControls) => {
        // Get matching element to toggle.
        const toggle = document.getElementById(toggleControls.dataset.toggle);

        // Add classes to each element for styling.
        toggleControls.classList.add(css.toggle_controls);
        toggle.classList.add(css.toggle);

        // Set up toggle.
        new AccessibleToggle( // eslint-disable-line no-new
            toggle,
            {
                assignFocus: false,
                trapFocus: false,
                ...config,
            },
        );
    });
}

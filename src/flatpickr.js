/**
 * Provides a popup box to select dates for forms.
 * @modules flatpickr
 */

import flatpickr from 'flatpickr';
import LabelPlugin from 'flatpickr/dist/plugins/labelPlugin/labelPlugin.js';
import css from './scss/flatpickr.scss';

/**
 * Sets up an element to select dates with flatpickr.
 * @param {Node} element Element to setup.
 * @param {Object} [config] Additional configuration values, see:
 *    https://flatpickr.js.org/options/
 */
export function setup(element, config = {}) {
    const fp = flatpickr(element, {
        plugins: [new LabelPlugin()],
        ...config,
    });

    fp.calendarContainer.classList.add(css.flatpickr);

    return fp;
}

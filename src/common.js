/**
 * Common styles for the content of a page.
 * @modules common
 */

import css from './scss/common.scss';

export { css };

/**
 * Setup common styles.
 * @param {Object} [config] Configuration values for the styles.
 * @param {string} [config.id] ID of the element to add the main CSS class to,
 *    if not specified any main element will be used instead.
 */
export function setup(config = {}) {
    const main = document.querySelector(config.id ? `#${config.id}` : 'main');

    if (main) {
        main.classList.add(css.common);
    }
}

/**
 * Provides improved tooltips for elements.
 * @modules tippy
 */

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import css from './scss/tippy.scss';

/**
 * Sets up a tooltip for selected elements' first children.
 * @param {string} selector Selector used to identify elements. The elements
 *    should have a child element.
 * @param {Object} [config] Additional configuration values, see:
 *    https://atomiks.github.io/tippyjs/v6/all-props/
 */
export function setupChild(selector, config = {}) {
    for (const element of document.querySelectorAll(selector)) {
        if (!element.firstElementChild) {
            return;
        }

        const instance = tippy(element, {
            allowHTML: true,
            arrow: true,
            content: element.firstElementChild,
            placement: 'right',
            theme: 'light-border',
            ...config,
        });

        instance.popper.classList.add(css.tippy);
    }
}

/**
 * Sets up a tooltip for selected elements' titles.
 * @param {string} selector Selector used to identify elements. The elements
 *    should have a title attribute with the content for the tooltip.
 * @param {Object} [config] Additional configuration values, see:
 *    https://atomiks.github.io/tippyjs/v6/all-props/
 */
export function setup(selector = '[title]', config = {}) {
    for (const element of document.querySelectorAll(selector)) {
        const instance = tippy(element, {
            arrow: true,
            content: element.getAttribute('title'),
            placement: 'right',
            theme: 'light-border',
            ...config,
        });

        instance.popper.classList.add(css.tippy);
        element.setAttribute('title', '');
    }
}

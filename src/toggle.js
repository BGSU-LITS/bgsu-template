import AccessibleToggle from 'accessible-toggle';
import css from './scss/toggle.scss';

export function setup(selector = '[data-toggle]', config = {}) {
    document.querySelectorAll(selector).forEach((toggleControls) => {
        const toggle = document.getElementById(toggleControls.dataset.toggle);

        toggleControls.classList.add(css.toggle_controls);
        toggle.classList.add(css.toggle);

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

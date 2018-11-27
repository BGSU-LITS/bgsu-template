import css from './css/facets.css';

export function setup(toggle) {
    document.body.classList.add(css.facets);

    toggle(
        '[data-toggle^="facets-top-"]',
        {
            assignFocus: false,
            closeOnClickOutside: true,
            trapFocus: false,
        }
    );

    toggle(
        '[data-toggle^="facets-all-"]',
        {
            assignFocus: false,
            closeOnClickOutside: true,
            mediaQuery: '(min-width: 980px)',
            trapFocus: false,
        }
    );
}

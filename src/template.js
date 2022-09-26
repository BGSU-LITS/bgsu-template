/**
 * Standardized header and footer for a webpage.
 * @modules template
 */

import pugHeader from './pug/template/header.pug';
import pugFooter from './pug/template/footer.pug';

import css from './scss/template.scss';
import { setup as toggle } from './toggle';

/**
 * Setup the main element with the contents of the page.
 * @param {Object} config Configuration values for the template.
 * @param {Object} [config.main] Configuration values for the main element.
 * @param {string} [config.main.id] The ID for the main element. If the element
 *    already exists, it will be used as-is. Otherwise, a new main element with
 *    this ID will be created.
 * @param {string} [config.main.top] The ID of the top of the page skip to
 *    content link, which shouldn't be moved to the container.
 */
function setupMain(config) {
    let main;
    let from;

    if (config.main.id) {
        // Look for an existing main element.
        main = document.getElementById(config.main.id);

        // If found, copy that elements into the container.
        from = main;
    }

    if (!main) {
        // No main element was found, so create one.
        main = document.createElement('main');

        if (config.main.id) {
            main.id = config.main.id;
        }

        // Set to copy elements from the body.
        from = document.body;
        from.append(main);
    }

    // Add a container to the main element.
    const container = document.createElement('div');
    container.classList.add(css.template_container);
    main.append(container);

    // Set a CSS class to the main element for styling.
    main.classList.add(css.template_main);

    let count = 0;

    // Move all existing elements to the container.
    while (from.childNodes[count]) {
        // Skip the main element, container element, and any configured top.
        if (
            from.childNodes[count] === main
            || from.childNodes[count] === container
            || from.childNodes[count].id === config.main.top
        ) {
            count += 1;
        } else {
            container.append(from.childNodes[count]);
        }
    }

    return main;
}

export { css, toggle };

/**
 * Add the templated header to the page.
 * @param {Object} config Configuration values for the template.
 * @param {Object} [config.main] Configuration values for the main element.
 * @param {string} [config.main.id] The ID for the main element. If the element
 *    already exists, it will be used as-is. Otherwise, a new main element with
 *    this ID will be created.
 * @param {string} [config.main.top] The ID of the top of the page skip to
 *    content link. If the element already exists, it will be used as-is.
 *    Otherwise, a new anchor with this ID will be created and will link to
 *    the ID of the main element.
 * @param {Object} [config.unit] Configure name of the unit of the University.
 * @param {string} [config.unit.text] Short name of the unit.
 * @param {string} [config.unit.thin] Thin text added before the short name to
      create a long name of the unit.
 * @param {string} [config.unit.href] URL to the unit's main page.
 * @param {Object} [config.site] Configure name of the current site.
 * @param {string} [config.site.text] Name of the site.
 * @param {string} [config.site.href] URL to the site's main page.
 * @param {string} [config.site.title] Accessible title for the site.
 * @param {boolean} [config.site.heading] If true, the site name will be added
 *    as the h1 element for the page, otherwise just as a div.
 * @param {Object[]} [config.menu] Menu items to be added to the header.
 * @param {string} [config.menu[].text] Name of the menu item.
 * @param {string} [config.menu[].href] URL to link the item to. For submenus,
 *    do not specify or specify as '#'.
 * @param {string} [config.menu[].title] Accessible title for the item.
 * @param {Object[]} [config.menu[].menu] Submenu specified in same fashion.
 * @param {Object} [config.user] Configure information about the user.
 * @param {string} [config.user.text] Text describing the current user.
 * @param {Object[]} [config.user.menu] Menu for the user specified as above.
 * @param {Object} [config.form] Configure a search form.
 * @param {string} [config.form.action] URL of the form's action
 * @param {string} [config.form.method] The form's method.
 * @param {string} [config.form.name] Name of the form's text input, defaults
 *    to "search" when not specified.
 * @param {string} [config.form.value] Value of the form's text input, used to
 *    show previously submitted value.
 * @param {string} [config.form.text] Placeholder text for form's text input.
 * @param {Object[]} [config.form.hidden] Hidden fields for the form.
 * @param {Object[]} [config.form.menu] Menu for the form specified as above.
 * @param {string} [config.form.hidden[].name] Name of the hidden field.
 * @param {string} [config.form.hidden[].value] Value of the hidden field.
 * @param {Object} [config.note] Configure notes for the page.
 * @param {string} [config.note.header] Text of a note for the header.
 * @param {Element} before The existing element the header should be inserted
 *    before. If this elemented does not exist, the header will be inserted as
 *    the first element of the body.
 */
export function header(config, before) {
    // Retrieve the HTML elements for the templated header.
    const html = pugHeader({ config, css });

    // Add the elements to the page.
    if (before) {
        before.insertAdjacentHTML('beforebegin', html);
    } else {
        document.body.insertAdjacentHTML('afterbegin', html);
    }

    // Enable the whole menu to be togglable on mobile devices.
    if (config.menu || config.form) {
        toggle(`[data-toggle=${css.template_header_nav_menu}]`, {
            mediaQuery: '(max-width: 991px)',
        });
    }

    // Enable submenus to be togglable on desktop devices.
    if (config.menu) {
        const toggleMenu = (menu, prefix) => menu.forEach((item, index) => {
            if (item.menu) {
                toggle(`[data-toggle=${prefix}_${index}]`, {
                    closeOnClickOutside: true,
                    mediaQuery: '(min-width: 992px)',
                });

                toggleMenu(item.menu, `${prefix}_${index}`);
            }
        });

        toggleMenu(config.menu, css.template_header_nav_menu);
    }
}

/**
 * Add the templated footer to the page.
 * @param {Object} config Configuration values for the template.
 * @param {Object} [config.help] Configure additional help as a button in the
 *    footer near the contact information.
 * @param {string} [config.help.heading] Heading  text for the help button.
 * @param {string} [config.help.text] Text for the help button.
 * @param {string} [config.help.href] URL the help button links to.
 * @param {Object} [config.note] Configure notes for the page.
 * @param {string} [config.note.footer] Text of a note for the footer.
 * @param {Element} after The existing element the footer should be inserted
 *    after. If this elemented does not exist, the footer will be inserted as
 *    the last element of the body.
 */
export function footer(config, after) {
    // Retrieve the HTML elements for the templated footer.
    const html = pugFooter({ config, css });

    // Add the elements to the page.
    if (after) {
        after.insertAdjacentHTML('afterend', html);
    } else {
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

/**
 * Setup the standardized template.
 * @param {Object} [config] Configuration values for the template.
 * @param {Object} [config.main] Configuration values for the main element.
 * @param {string} [config.main.id] The ID for the main element. If the element
 *    already exists, it will be used as-is. Otherwise, a new main element with
 *    this ID will be created.
 * @param {string} [config.main.top] The ID of the top of the page skip to
 *    content link. If the element already exists, it will be used as-is.
 *    Otherwise, a new anchor with this ID will be created and will link to
 *    the ID of the main element.
 * @param {boolean} [config.meta] If true, a meta viewport element is added to
 *    the head to prevent mobile devices from initially scaling the page.
 * @param {Object} [config.unit] Configure name of the unit of the University.
 * @param {string} [config.unit.text] Short name of the unit.
 * @param {string} [config.unit.thin] Thin text added before the short name to
      create a long name of the unit.
 * @param {string} [config.unit.href] URL to the unit's main page.
 * @param {Object} [config.site] Configure name of the current site.
 * @param {string} [config.site.text] Name of the site.
 * @param {string} [config.site.href] URL to the site's main page.
 * @param {string} [config.site.title] Accessible title for the site.
 * @param {boolean} [config.site.heading] If true, the site name will be added
 *    as the h1 element for the page, otherwise just as a div.
 * @param {Object[]} [config.menu] Menu items to be added to the header.
 * @param {string} [config.menu[].text] Name of the menu item.
 * @param {string} [config.menu[].href] URL to link the item to. For submenus,
 *    do not specify or specify as '#'.
 * @param {string} [config.menu[].title] Accessible title for the item.
 * @param {Object[]} [config.menu[].menu] Submenu specified in same fashion.
 * @param {Object} [config.user] Configure information about the user.
 * @param {string} [config.user.text] Text describing the current user.
 * @param {Object[]} [config.user.menu] Menu for the user specified as above.
 * @param {Object} [config.form] Configure a search form.
 * @param {string} [config.form.action] URL of the form's action
 * @param {string} [config.form.method] The form's method.
 * @param {string} [config.form.name] Name of the form's text input, defaults
 *    to "search" when not specified.
 * @param {string} [config.form.value] Value of the form's text input, used to
 *    show previously submitted value.
 * @param {string} [config.form.text] Placeholder text for form's text input.
 * @param {Object[]} [config.form.hidden] Hidden fields for the form.
 * @param {Object[]} [config.form.menu] Menu for the form specified as above.
 * @param {string} [config.form.hidden[].name] Name of the hidden field.
 * @param {string} [config.form.hidden[].value] Value of the hidden field.
 * @param {Object} [config.help] Configure additional help as a button in the
 *    footer near the contact information.
 * @param {string} [config.help.heading] Heading  text for the help button.
 * @param {string} [config.help.text] Text for the help button.
 * @param {string} [config.help.href] URL the help button links to.
 * @param {Object} [config.note] Configure notes for the page.
 * @param {string} [config.note.header] Text of a note for the header.
 * @param {string} [config.note.footer] Text of a note for the footer.
 */
export function setup(config = {}) {
    let main;

    // If requested, move existing elements into the main container.
    if (config.main) {
        main = setupMain(config);

        // If a top of the page anchor exists, do not duplicate it.
        if (config.main.top && document.getElementById(config.main.top)) {
            config.main.top = false;
        }
    }

    // If requested, configure the meta viewport element to prevent scaling.
    if (config.meta) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1';
        document.head.append(meta);
    }

    // Add the primary CSS class to the root element.
    document.documentElement.classList.add(css.template);

    // Set up the templated header and footer.
    header(config, main);
    footer(config, main);
}

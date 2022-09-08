import pugHeader from './pug/template/header.pug';
import pugFooter from './pug/template/footer.pug';

import css from './scss/template.scss';
import { setup as toggle } from './toggle';

function setupMain(config) {
    let main;
    let from;

    if (config.main.id) {
        main = document.getElementById(config.main.id);
        from = main;
    }

    if (!main) {
        main = document.createElement('main');

        if (config.main.id) {
            main.id = config.main.id;
        }

        from = document.body;
        from.append(main);
    }

    const container = document.createElement('div');
    container.classList.add(css.template_container);

    main.append(container);
    main.classList.add(css.template_main);

    let count = 0;

    while (from.childNodes[count]) {
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

export function header(config, before) {
    const html = pugHeader({ config, css });

    if (before) {
        before.insertAdjacentHTML('beforebegin', html);
    } else {
        document.body.insertAdjacentHTML('afterbegin', html);
    }

    if (config.menu || config.form) {
        toggle(`[data-toggle=${css.template_header_nav_menu}]`, {
            mediaQuery: '(max-width: 991px)',
        });
    }

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

export function footer(config, after) {
    const html = pugFooter({ config, css });

    if (after) {
        after.insertAdjacentHTML('afterend', html);
    } else {
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

export function setup(config = {}) {
    let main;

    if (config.main) {
        main = setupMain(config);

        if (config.main.top && document.getElementById(config.main.top)) {
            config.main.top = false;
        }
    }

    if (config.meta) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1';
        document.head.append(meta);
    }

    if (config.root) {
        document.documentElement.classList.add(css.template);
    }

    header(config, main);
    footer(config, main);
}

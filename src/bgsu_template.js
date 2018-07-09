import 'core-js/fn/object/assign';
import 'events-polyfill/src/constructors/Event.js';
import Toggle from 'accessible-toggle';

import pugHeader from './pug/header.pug';
import pugFooter from './pug/footer.pug';

import css from './css/template.css';
export { css };

export function header(config, before) {
    var html = pugHeader({config: config, css: css});

    if (before) {
        before.insertAdjacentHTML('beforebegin', html);
    } else {
        document.body.insertAdjacentHTML('afterbegin', html);
    }

    if (config.menu || config.form) {
        this.toggle(document.getElementById(css.menu), '(max-width: 767px)');
    }

    if (config.menu) {
        for (var index = 0; index < config.menu.length; index++) {
            if (config.menu[index].menu) {
                this.toggle(
                    document.getElementById(css.menu + '_' + index),
                    '(min-width: 768px)',
                    true
                );
            }
        }
    }
}

export function footer(config, after) {
    var html = pugFooter({config: config, css: css});

    if (after) {
        after.insertAdjacentHTML('afterend', html);
    } else {
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

export function setup(config = {}) {
    var meta, from, main, container;

    if (config.meta) {
        meta = document.head.appendChild(document.createElement('meta'));
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
    }

    if (config.body) {
        document.body.classList.add(css.body);
    }

    if (config.main) {
        if (config.main.id) {
            from = main = document.getElementById(config.main.id);
        }

        if (!main) {
            from = document.body;
            main = from.appendChild(document.createElement('main'));

            if (config.main.id) {
                main.id = config.main.id;
            }
        }

        main.classList.add(css.main);

        if (config.main.common) {
            main.classList.add(css.common);
        }

        container = main.appendChild(document.createElement('div'));
        container.classList.add(css.container);

        var count = 0;

        while (from.childNodes[count]) {
            if (from.childNodes[count] === main
             || from.childNodes[count] === container
             || from.childNodes[count].id === 'top') {
                count++;
                continue;
            }

            container.appendChild(from.childNodes[count]);
        }
    }

    this.header(config, main);
    this.footer(config, main);
}

export function toggle(
    element,
    mediaQuery = false,
    closeOnClickOutside = false
) {
    new Toggle(element, {
        assignFocus: false,
        closeOnClickOutside: closeOnClickOutside,
        mediaQuery: mediaQuery,
        trapFocus: false,
    });
}

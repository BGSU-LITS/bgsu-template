import 'core-js/features/object/assign';
import 'events-polyfill/src/constructors/Event.js';
import Toggle from 'accessible-toggle';
import css from './css/toggle.css';

export function setup(selector = null, config = {}) {
    selector = selector || '[data-toggle]';

    config = Object.assign(
        { assignFocus: false, trapFocus: false },
        config
    );

    document.body.classList.add(css.toggle);

    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function (element) {
            new Toggle(
                document.getElementById(element.dataset.toggle),
                config
            );
        }
    );
}

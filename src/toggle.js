import 'core-js/fn/object/assign';
import 'events-polyfill/src/constructors/Event.js';
import Toggle from 'accessible-toggle';
import css from './css/toggle.css';

export function setup(
    selector = '[data-toggle]',
    config = { assignFocus: false, trapFocus: false }
) {
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

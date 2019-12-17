import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import './css/tippy.css';

export function setup(selector = null, config = {}) {
    selector = selector || '[title]';

    config = Object.assign(
        { arrow: true, placement: 'right', theme: 'light-border' },
        config
    );

    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function(element) {
            config.content = element.getAttribute('title');
            element.setAttribute('title', '');
            tippy(element, config);
        }
    );
}

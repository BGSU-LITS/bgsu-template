import tippy from 'tippy.js';
import './css/tippy.css';

export function setup(
    selector = '[title]',
    config = { arrow: true, placement: 'right' }
) {
    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function(element) {
            config.content = element.getAttribute('title');
            element.setAttribute('title', '');
            tippy(element, config);
        }
    );
}

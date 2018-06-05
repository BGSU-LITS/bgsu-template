import tippy from 'tippy.js';
import './css/tippy.css';

export function setup(selector, config = {}) {
    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(
            document.querySelectorAll(selector),
            function(element) {
                tippy(element, config);
            }
        );
    });
}

import tablist from '@accede-web/tablist';
import './css/tablist.css';

export function setup(selector) {
    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(
            document.querySelectorAll(selector),
            function(element) {
                new tablist(element).mount();
            }
        );
    });
}

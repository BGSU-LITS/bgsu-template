import tablist from '@accede-web/tablist';
import css from './css/tablist.css';

export function setup(selector = '[role="tablist"]') {
    document.body.classList.add(css.tablist);

    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function(element) {
            new tablist(element).mount();
        }
    );
}

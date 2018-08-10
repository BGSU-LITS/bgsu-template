import './css/facets.css';

export function setup(toggle) {
    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(
            document.querySelectorAll('[data-toggle^="facets-"]'),
            function (element) {
                toggle(
                    document.getElementById(element.dataset.toggle),
                    element.dataset.toggle.match(/-all$/)
                        ? '(min-width: 980px)' : false,
                    true
                );
            }
        );
    });
}

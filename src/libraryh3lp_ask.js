import jsonp from 'jsonp';
import coreInput from '@nrk/core-input';

import css from './css/libraryh3lp_ask.css';

export function setup(selector, name) {
    var url = 'https://' + name + '.ask.libraryh3lp.com/';

    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function(element) {
            var debounce = function() {};
            var results = document.createElement('div');

            results.setAttribute('hidden', '');
            results.classList.add(css.libraryh3lp_ask_results);

            element.parentNode.insertBefore(results, element.nextSibling);
            coreInput(element);

            document.addEventListener('input.filter', function(event) {
                if (element !== event.target) {
                    return;
                }

                event.preventDefault();
                debounce();

                var value = element.value.trim();

                if (!value.length) {
                    coreInput(element, '');
                    return;
                }

                debounce = jsonp(
                    url + 'instant?q=' + value,
                    function(err, data) {
                        if (err) {
                            coreInput(element, '');
                            return;
                        }

                        var items = data.map(function(item) {
                            return '<a href="' + url + '/questions/' +
                                item.id + '">' + item.html + '</a>';
                        });

                        coreInput(element, items.join(''));
                    }
                );
            });
        }
    );
}

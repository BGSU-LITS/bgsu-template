import jsonp from 'jsonp';
import coreInput from '@nrk/core-input';

import css from './css/libraryh3lp_ask.css';

export function cloud(selector, name) {
    var url = 'https://' + name + '.ask.libraryh3lp.com';

    jsonp(
        url + '/topics',
        function(err, data) {
            if (err) {
                return;
            }

            var max, min;

            for (var count = 0; count < data.length; count++) {
                if (!max || data[count].count > max) {
                    max = data[count].count;
                }

                if (!min || data[count].count < min) {
                    min = data[count].count;
                }
            }

            var items = data.map(function(item) {
                var size = (item.count - min) / (max - min);

                return '<a href="' +
                    url + item.url + '" style="font-size:' +
                    Math.round(24 * size + 12 * (1 - size)) + 'pt">' +
                    item.name + '</a> ';
            });

            Array.prototype.forEach.call(
                document.querySelectorAll(selector),
                function(element) {
                    element.classList.add(css.libraryh3lp_ask_cloud);
                    element.innerHTML = items.join('');
                }
            );
        }
    );
}

export function setup(selector, name) {
    var url = 'https://' + name + '.ask.libraryh3lp.com';

    Array.prototype.forEach.call(
        document.querySelectorAll(selector),
        function(element) {
            var debounce = function() {};
            var results = document.createElement('div');

            results.setAttribute('hidden', '');
            results.classList.add(css.libraryh3lp_ask_results);
            results.id = css.libraryh3lp_ask_results;

            element.parentNode.insertBefore(results, element.nextSibling);
            element.setAttribute('aria-controls', css.libraryh3lp_ask_results);
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
                    url + '/instant?q=' + value,
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

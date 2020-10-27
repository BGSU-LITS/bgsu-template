import jsonp from 'jsonp';
import ariaAutocomplete from 'aria-autocomplete';

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
            ariaAutocomplete(element, {
                source: function(query, render) {
                    jsonp(
                        url + '/instant?q=' + query,
                        function(err, data) {
                            if (err) {
                                render([]);
                                return;
                            }

                            render(data.map(function(item) {
                                return {
                                    value: url + '/questions/' + item.id,
                                    label: item.question,
                                };
                            }));
                        }
                    );
                },
                onConfirm: function(selection) {
                    document.location = selection.value;
                },
                cssNameSpace: css.libraryh3lp_ask,
                wrapperClassName: css.libraryh3lp_ask,
            });
        }
    );
}

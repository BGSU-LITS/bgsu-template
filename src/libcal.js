import jsonp from 'jsonp';
import URLSearchParams from '@ungap/url-search-params';

import css from './css/libcal.css';
import pug from './pug/libcal.pug';

export function setup(selector, iid, lid = 0, config = {}) {
    var params = new URLSearchParams(window.location.search);
    var url = 'https://api3.libcal.com/api_hours_';

    if (config.mode === 'week') {
        url += 'grid.php?format=json&systemTime=0&weeks=1&iid=' + iid;
    } else {
        url += 'today.php?format=json&systemTime=1&iid=' + iid + '&lid=' + lid;
    }

    jsonp(url, function(err, data) {
        if (!err) {
            Array.prototype.forEach.call(
                document.querySelectorAll(selector),
                function(element) {
                    element.innerHTML = pug({
                        locations: data.locations,
                        params: params,
                        config: config,
                        css: css,
                    });

                    if (config.callback) {
                        config.callback(element);
                    }
                }
            );
        }
    });
}

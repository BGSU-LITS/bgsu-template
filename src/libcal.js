import cssLibcal from './scss/libcal.scss';
import pugLibcal from './pug/libcal.pug';
import pugLibcalSelect from './pug/libcal_select.pug';

export function get(iid, lid, config, callback) {
    let url = `https://api3.libcal.com/api_hours_${
        config.mode === 'week' ? 'grid' : 'today'
    }.php?format=${
        config.format || 'json'
    }&systemTime=0&iid=${iid}&lid=${lid}`;

    if (config.mode === 'week' && config.weeks) {
        url += `&weeks=${config.weeks}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => callback(data));
}

export function insert(locations, css, pug, selector, config) {
    const params = new URLSearchParams(window.location.search);

    document.querySelectorAll(selector).forEach(element => {
        element.innerHTML = pug({
            locations, params, config, css,
        });

        if (config.callback) {
            config.callback(element, css);
        }
    });
}

export function jsonld(iid, lid) {
    get(iid, lid, { format: 'jsonld', mode: 'week' }, data => {
        const script = document.createElement('script');

        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);

        document.body.append(script);
    });
}

export function select(selector, iid, lid, config = {}) {
    get(iid, lid, config, data => {
        insert(
            data.locations,
            cssLibcal,
            pugLibcalSelect,
            selector,
            config,
        );

        const form = document.getElementById(cssLibcal.libcal_select);

        form.querySelector('select').addEventListener('change', () => {
            form.requestSubmit();
        });
    });
}

export function setup(selector, iid, lid, config = {}) {
    get(iid, lid, { weeks: 1, ...config }, data => insert(
        data.locations || Object.values(data),
        cssLibcal,
        pugLibcal,
        selector,
        config,
    ));
}

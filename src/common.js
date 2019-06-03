import css from './css/common.css';

export { css };

export function setup(config = {}) {
    var main;

    if (config.id) {
        main = document.getElementById(config.id);
    } else {
        main = document.querySelector('main');
    }

    if (main) {
        main.classList.add(css.common);
    }
}

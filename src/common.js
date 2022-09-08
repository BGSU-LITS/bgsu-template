import css from './scss/common.scss';

export { css };

export function setup(config = {}) {
    const main = document.querySelector(config.id ? `#${config.id}` : 'main');

    if (main) {
        main.classList.add(css.common);
    }
}

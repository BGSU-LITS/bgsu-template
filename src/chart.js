import Chart from 'chart.js/auto';
import { draw as patternDraw } from 'patternomaly';

import css from './scss/chart.scss';

export function fill(selector, style) {
    for (const element of document.querySelectorAll(selector)) {
        let canvas = element.querySelector('canvas');

        if (!canvas) {
            canvas = document.createElement('canvas');
        }

        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;

        element.append(canvas);
        element.classList.add(css.fill);

        const context = canvas.getContext('2d');
        context.fillStyle = style;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

export function pattern(shape, background, config = {}) {
    let settings = config;

    if (typeof background === 'object') {
        settings = background;
    } else {
        settings.background = background;
    }

    if (typeof shape === 'object') {
        settings = shape;
    } else {
        settings.shape = shape;
    }

    settings.background = settings.background || 'rgba(100, 100, 100, 0.7)';
    settings.foreground = settings.foreground || 'rgba(255, 255, 255, 0.8)';
    settings.shape = settings.shape || 'diagonal-right-left';
    settings.space = settings.space || 6;

    return patternDraw(
        settings.shape,
        settings.background,
        settings.foreground,
        settings.space,
    );
}

export function setup(element, config = {}) {
    document.documentElement.classList.add(css.chart);
    element.classList.add(css.canvas);

    return new Chart(element, config);
}

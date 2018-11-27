import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import './css/flatpickr.css';

export function setup(selector, config = {}) {
    flatpickr(selector, config);
}

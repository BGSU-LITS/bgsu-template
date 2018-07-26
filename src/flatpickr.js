import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import './css/flatpickr.css';

export function setup(selector, config = {}) {
    document.addEventListener('DOMContentLoaded', function() {
        flatpickr(selector, config);
    });
}

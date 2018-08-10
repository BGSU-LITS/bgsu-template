import 'core-js/fn/object/assign';
import 'events-polyfill/src/constructors/Event.js';
import Toggle from 'accessible-toggle';

export function setup(
    element,
    mediaQuery = false,
    closeOnClickOutside = false
) {
    new Toggle(element, {
        assignFocus: false,
        closeOnClickOutside: closeOnClickOutside,
        mediaQuery: mediaQuery,
        trapFocus: false,
    });
}

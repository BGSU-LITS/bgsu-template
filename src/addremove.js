import css from './scss/addremove.scss';

export function setup(selector = '[data-addremove]') {
    document.querySelectorAll(selector).forEach((addremove) => {
        if (addremove.dataset.addremove === 'add') {
            addremove.classList.add(css.addremove_add);
            addremove.removeAttribute('disabled');

            return;
        }

        if (addremove.dataset.addremove === 'remove') {
            addremove.classList.add(css.addremove_remove);

            return;
        }

        addremove.classList.add(css.addremove);

        Array.prototype.filter.call(
            addremove.querySelector(':first-child')
                .getElementsByClassName(css.addremove_remove),
            (element) => element.setAttribute('disabled', ''),
        );
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains(css.addremove_add)) {
            const final = event.target.closest(`.${css.addremove} > *`);
            const clone = final.previousElementSibling.cloneNode(true);

            Array.prototype.forEach.call(
                clone.getElementsByClassName(css.addremove_remove),
                (element) => element.removeAttribute('disabled'),
            );

            clone.querySelectorAll('input[name]').forEach((input) => {
                input.name = input.name.replace(/\d+/, (n) => +n + 1);
                input.title = input.title.replace(/\d+/, (n) => +n + 1);
                input.value = '';
            });

            final.parentNode.insertBefore(clone, final);
            clone.querySelector('input').focus();
            event.preventDefault();
        }

        if (event.target.classList.contains(css.addremove_remove)) {
            event.target.closest(`.${css.addremove} > *`).remove();
            event.preventDefault();
        }
    });
}

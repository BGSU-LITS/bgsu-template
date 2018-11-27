export function setup() {
    document.querySelector('.form-item-add').removeAttribute('disabled');

    Array.prototype.forEach.call(
        document.querySelectorAll('.form-item-disabled [name]'),
        function (element) {
            element.setAttribute('disabled', '');
        }
    );

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('form-item-add')) {
            var closest = event.target.closest('.form-item');
            var final = closest.previousElementSibling;
            var clone = final.cloneNode(true);

            Array.prototype.forEach.call(
                clone.querySelectorAll('[name]'),
                function(input) {
                    var matches = input.name.match(/\[(\d+)\]/);

                    if (matches) {
                        var number = parseInt(matches[1], 10);

                        input.setAttribute('name', input.name.replace(
                            '[' + number + ']',
                            '[' + (number + 1) + ']'
                        ));

                        input.setAttribute('id', input.id.replace(
                            '-' + number + '-',
                            '-' + (number + 1) + '-'
                        ));
                    }
                }
            );

            Array.prototype.forEach.call(
                final.querySelectorAll('[disabled]'),
                function(input) {
                    input.removeAttribute('disabled');
                }
            );

            final.classList.remove('form-item-disabled');
            final.parentNode.insertBefore(clone, final.nextElementSibling);
        }

        if (event.target.classList.contains('form-item-remove')) {
            event.target.closest('.form-item').remove();
        }
    });
}

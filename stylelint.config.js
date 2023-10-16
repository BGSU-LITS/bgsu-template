const pattern = '^([a-z][a-z0-9]*)(__?[a-z0-9]+)*$';

module.exports = {
    extends: 'stylelint-config-standard-scss',
    plugins: [
        'stylelint-stylistic',
    ],
    rules: {
        'custom-media-pattern': [pattern, {
            message: 'Expected custom media query name to be snake_case',
        }],
        'custom-property-pattern': [pattern, {
            message: 'Expected custom property name to be snake_case',
        }],
        'declaration-no-important': true,
        'keyframes-name-pattern': [pattern, {
            message: 'Expected keyframe name to be snake_case',
        }],
        'selector-class-pattern': [pattern, {
            message: 'Expected class selector to be snake_case',
        }],
        'selector-id-pattern': [pattern, {
            message: 'Expected id selector to be snake_case',
        }],
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global', 'local'],
        }],
        'scss/at-function-pattern': [pattern, {
            message: 'Expected function name to be snake_case',
        }],
        'scss/at-mixin-pattern': [pattern, {
            message: 'Expected mixin name to be snake_case',
        }],
        'scss/dollar-variable-empty-line-before': undefined,
        'scss/dollar-variable-empty-line-after': ['always', {
            except: ['last-nested', 'before-dollar-variable'],
        }],
        'scss/dollar-variable-pattern': [pattern, {
            message: 'Expected variable to be snake_case',
        }],
        'stylistic/indentation': 4,
        'stylistic/max-line-length': 80,
        'stylistic/selector-list-comma-newline-after': 'always-multi-line',
        'stylistic/string-quotes': 'single',
    },
};

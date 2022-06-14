const pattern = '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$';

module.exports = {
    extends: 'stylelint-config-standard-scss',
    rules: {
        'custom-media-pattern': [pattern, {
            message: 'Expected custom media query name to be snake_case',
        }],
        'custom-property-pattern': [pattern, {
            message: 'Expected custom property name to be snake_case',
        }],
        'declaration-no-important': true,
        indentation: 4,
        'keyframes-name-pattern': [pattern, {
            message: 'Expected keyframe name to be snake_case',
        }],
        'max-line-length': 80,
        'selector-class-pattern': [pattern, {
            message: 'Expected class selector to be snake_case',
        }],
        'selector-id-pattern': [pattern, {
            message: 'Expected id selector to be snake_case',
        }],
        'selector-no-qualifying-type': [true, {
            ignore: 'attribute',
        }],
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: 'global',
        }],
        'string-quotes': 'single',
        'scss/at-mixin-pattern': [pattern, {
            message: 'Expected mixin name to be snake_case',
        }],
        'scss/dollar-variable-pattern': [pattern, {
            message: 'Expected variable to be snake_case',
        }],
        'scss/dollar-variable-empty-line-before': undefined,
        'scss/dollar-variable-empty-line-after': ['always', {
            except: ['last-nested', 'before-dollar-variable'],
        }],
    },
};

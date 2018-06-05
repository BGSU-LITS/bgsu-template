module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        indentation: 4,
        'max-line-length': 80,

        'font-family-name-quotes': 'always-where-recommended',
        'function-url-quotes': 'always',
        'selector-attribute-quotes': 'always',
        'string-quotes': 'double',

        'at-rule-no-vendor-prefix': true,
        'media-feature-name-no-vendor-prefix': true,
        'property-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,

        'declaration-no-important': true,
        'selector-no-qualifying-type': true,

        'font-weight-notation': 'numeric',

        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global'],
        }],

        'at-rule-empty-line-before': ['always', {
            except: ['first-nested'],
            ignore: ['after-comment'],
        }]
    }
};

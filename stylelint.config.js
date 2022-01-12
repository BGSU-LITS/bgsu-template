module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'at-rule-empty-line-before': ['always', {
            except: ['first-nested'],
            ignore: ['after-comment'],
        }],
        'declaration-no-important': true,
        indentation: 4,
        'font-weight-notation': 'numeric',
        'max-line-length': 80,
        'selector-no-qualifying-type': true,
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global'],
        }]
    }
};

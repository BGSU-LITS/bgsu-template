module.exports = {
    plugins: {
        'postcss-import': {},
        'stylelint': {},
        'postcss-preset-env': {
            features: {
                'any-link-pseudo-class': {
                    preserve: false,
                },
                'custom-properties': {
                    preserve: false,
                },
                'custom-media-queries': true,
                'nesting-rules': true,
            }
        },
        'cssnano': {},
        'postcss-reporter': {
            clearReportedMessages: true,
        },
    },
};

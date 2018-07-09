module.exports = {
    plugins: {
        'postcss-import': {},
        'colorguard': {
            whitelist: [
                ['#ffffff', '#f2f2f2'],
            ],
        },
        'stylelint': {},
        'postcss-preset-env': {
            features: {
                'any-link-pseudo-class': {
                    preserve: false,
                },
                'custom-properties': {
                    preserve: false,
                    warnings: true,
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

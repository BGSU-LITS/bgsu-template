module.exports = {
    env: {
        browser: true,
    },
    extends: [
        'airbnb-base',
        'plugin:array-func/all',
        'plugin:compat/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/all',
    ],
    overrides: [
        {
            files: [
                '.eslintrc.js',
                'postcss.config.js',
                'stylelint.config.js',
                'svgo.config.js',
                'webpack.config.js',
            ],
            rules: {
                'unicorn/prefer-module': 'off',
            },
        },
    ],
    plugins: [
        'sonarjs',
        'unicorn',
    ],
    rules: {
        'import/prefer-default-export': 'off',
        indent: ['error', 4],
        'no-param-reassign': ['error', { props: false }],
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-document-cookie': 'off',
        'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
        'unicorn/prefer-query-selector': 'off',
    },
};

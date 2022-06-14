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
        'arrow-parens': ['error', 'as-needed'],
        'import/prefer-default-export': 'off',
        indent: ['error', 4],
        'no-param-reassign': ['error', { props: false }],
        'unicorn/filename-case': ['error', { case: 'snakeCase' }],
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-document-cookie': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prevent-abbreviations': 'off',
    },
};

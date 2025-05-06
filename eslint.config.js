import arrayFunc from 'eslint-plugin-array-func';
import compat from 'eslint-plugin-compat';
import js from '@eslint/js';
import sonarjs from 'eslint-plugin-sonarjs';
import stylistic from '@stylistic/eslint-plugin';
import unicorn from 'eslint-plugin-unicorn';

export default [
    arrayFunc.configs.all,
    compat.configs['flat/recommended'],
    js.configs.recommended,
    sonarjs.configs.recommended,
    stylistic.configs.customize({
        arrowParens: true,
        braceStyle: '1tbs',
        indent: 4,
        quoteProps: 'as-needed',
        semi: true,
    }),
    unicorn.configs['flat/recommended'],
    {
        ignores: ['dist/'],
    },
    {
        rules: {
            'sonarjs/no-inverted-boolean-check': 'error',
            'sonarjs/constructor-for-side-effects': 'off',
            'unicorn/prefer-global-this': 'off',
            'unicorn/no-document-cookie': 'off',
            'unicorn/prefer-export-from':
                ['error', { ignoreUsedVariables: true }],
            'unicorn/prefer-query-selector': 'off',
            '@stylistic/max-len': 'error',
            '@stylistic/operator-linebreak':
                ['error', 'after'],
        },
    },
];

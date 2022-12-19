module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.ts',
                    '.tsx',
                ],
            },
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'airbnb-typescript/base',
            ],
            parserOptions: {
                project: ['./tsconfig.json'],
            },
            rules: {
                'import/extensions': 'off',
                'import/no-extraneous-dependencies': 'off',
                'consistent-return': 'off',
                '@typescript-eslint/indent': ['error', 4, {
                    SwitchCase: 1,
                }],
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/member-delimiter-style': ['error', {
                    multiline: {
                        delimiter: 'none',
                        requireLast: true,
                    },
                    singleline: {
                        delimiter: 'semi',
                        requireLast: false,
                    },
                    multilineDetection: 'brackets',
                }],
                '@typescript-eslint/no-shadow': 'warn',
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/padding-line-between-statements': [
                    'error',
                    {
                        blankLine: 'always',
                        prev: '*',
                        next: ['interface', 'type'],
                    },
                    {
                        blankLine: 'always',
                        prev: '*',
                        next: 'return',
                    },
                    {
                        blankLine: 'always',
                        prev: ['const', 'let', 'var'],
                        next: '*',
                    },
                    {
                        blankLine: 'any',
                        prev: ['const', 'let', 'var', 'type'],
                        next: ['const', 'let', 'var', 'type'],
                    },
                ],
                '@typescript-eslint/space-infix-ops': ['error', {
                    int32Hint: false,
                }],
                '@typescript-eslint/type-annotation-spacing': ['error', {
                    before: false,
                    after: true,
                    overrides: {
                        arrow: {
                            before: true,
                            after: true,
                        },
                    },
                }],
            },
        },
    ],
};

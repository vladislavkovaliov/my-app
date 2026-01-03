import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'dist/**',
        'next-env.d.ts',
        '.lintstagedrc.js',
        './src/generated/**',
        './src/components/**',
        'cz-adapter/**',
        'prisma/**',
    ]),
    {
        plugins: {
            perfectionist,
        },
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'perfectionist/sort-imports': 'error',
            'no-empty-pattern': 'off',
            'no-unused-vars': [
                'off',
                { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
            ],
        },
    },
]);

export default eslintConfig;

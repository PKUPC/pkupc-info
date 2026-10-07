import js from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import docusaurus from '@docusaurus/eslint-plugin';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
    { ignores: ['node_modules/**', 'build/**', '.docusaurus/**', '.pnpm-store/**'] },
    {
        files: ['**/*.{js,mjs,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: { ...globals.node, ...globals.browser },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react: fixupPluginRules(react),
            'react-hooks': hooks,
            '@docusaurus': fixupPluginRules(docusaurus),
        },
        settings: { react: { version: 'detect' } },
        rules: {
            ...js.configs.recommended.rules,
            ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
            ...tsPlugin.configs.recommended.rules,
            ...react.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            ...docusaurus.configs.recommended.rules,
            '@docusaurus/no-untranslated-text': 'off',
            '@docusaurus/string-literal-i18n-messages': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    prettier,
];

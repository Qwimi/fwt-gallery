/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:storybook/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['import', 'vue'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Встроенные модули Node.js (например, fs, path)
          'external', // Внешние библиотеки (например, lodash, axios)
          'internal', // Внутренние модули вашего проекта
          ['parent', 'sibling', 'index'] // Родительские, соседние и индексные файлы
        ],
        alphabetize: { order: 'asc', caseInsensitive: true } // Сортировка в алфавитном порядке, без учета регистра
      }
    ],
    'vue/multi-word-component-names': 'off'
  }
};

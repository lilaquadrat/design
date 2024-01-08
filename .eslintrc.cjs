/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root     : true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi                            : 0,
    'brace-style'                   : ['error', '1tbs', { allowSingleLine: true }],
    'multiline-ternary'             : ['error', 'always-multiline'],
    'no-param-reassign'             : ['error', { props: false }],
    'vue/multi-word-component-names': 0,
    'import/no-cycle'               : 0,
    'max-len'                       : [
      'warn',
      {
        code: 240,
      },
    ],
    curly                        : [2, 'multi-line'],
    'prefer-destructuring'       : 0,
    'no-multiple-empty-lines'    : [1, { max: 2 }],
    'no-multi-spaces'            : ['error', { ignoreEOLComments: false }],
    'arrow-spacing'              : ['error', { 'before': true, 'after': true }],
    'space-before-function-paren': ['error', {
      'anonymous' : 'always',
      'named'     : 'always',
      'asyncArrow': 'always'
    }],
    'newline-after-var'              : ['error', 'always'],
    'one-var'                        : ['error', 'never'],
    'comma-spacing'                  : ['error', { 'before': false, 'after': true }],
    'key-spacing'                    : ['error', { 'afterColon': true, mode: 'strict', 'align': 'colon' }],
    'indent'                         : ['error', 2],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev     : '*',
        next     : [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'const',
          'export',
          'import',
          'let',
          'var',
        ],
      },
      {
        blankLine: 'always',
        prev     : [
          'block',
          'block-like',
          'cjs-export',
          'class',
          'const',
          'export',
          'import',
          'let',
          'var',
        ],
        next: '*',
      },
      {
        blankLine: 'never',
        prev     : ['const', 'let', 'var'],
        next     : ['const', 'let', 'var'],
      },
      {
        blankLine: 'any',
        prev     : ['export', 'import'],
        next     : ['export', 'import'],
      },
    ],
    quotes: ['error', 'single'],
  },
};

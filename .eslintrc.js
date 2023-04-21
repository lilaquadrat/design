module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    moduleResolution: 'node',
  },
  'settings': {
    'import/resolver': {
      'typescript': {},
    },
  },
  rules: {
    "semi": "off",
    "@typescript-eslint/semi": ["error"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [
      'warn',
      {
        code: 240,
      },
    ],
    'class-methods-use-this': 1,
    'multiline-ternary': ['error', 'always-multiline'],
    'no-param-reassign': ['error', { props: false }],
    'import/no-cycle': 0,
    curly: [2, 'multi-line'],
    'prefer-destructuring': 0,
    'padded-blocks': [
      'error',
      {
        blocks: 'always',
        classes: 'always',
        switches: 'always',
      },
      {
        allowSingleLineBlocks: true,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 0,
    "vuejs-accessibility/heading-has-content": [
      "warn",
    ],
    'no-multiple-empty-lines': [1, { max: 2 }],
    'no-underscore-dangle': 'off',
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": [
          "block",
          "block-like",
          "cjs-export",
          "class",
          "const",
          "export",
          "import",
          "let",
          "var"
        ]
      },
      {
        "blankLine": "always",
        "prev": [
          "block",
          "block-like",
          "cjs-export",
          "class",
          "const",
          "export",
          "import",
          "let",
          "var"
        ],
        "next": "*"
      },
      {
        "blankLine": "never",
        "prev": ["const", "let", "var"],
        "next": ["const", "let", "var"]
      },
      { "blankLine": "any", "prev": ["export", "import"], "next": ["export", "import"] },
    ],
    quotes: ["error", "single"],
    "vuejs-accessibility/label-has-for" : 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

export default {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "@typescript-eslint/parser",
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "max-len": [
            "error",
            {
              "code": 200
            }
          ],
          "linebreak-style": "off", // 解决lf 和 crlf 报红
          "quotes": ["warn", "double"], // 引号类型 `` '' ''
          "class-methods-use-this": "off",
          "no-param-reassign": "off",
          "no-continue": "off",
          "comma-dangle": "off",
          "operator-linebreak": "off",
          "implicit-arrow-linebreak": "off",
          "arrow-body-style": "off",
          "vue/multi-word-component-names": [
            "error",
            {
              "ignores": ["index"] //需要忽略的组件名
            }
          ],
          "no-explicit-any": 'off'
    }
  }
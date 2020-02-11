module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    // 0、1、2分别表示不开启检查、警告、错误
    "quotes": [2, "single"], //单引号
    "no-console": 0, //不禁用console
    "no-debugger": 0, //禁用debugger
    "no-irregular-whitespace": 2, //不规则的空白不允许
    "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
    "react/jsx-indent-props": [2, 4],
  }
};
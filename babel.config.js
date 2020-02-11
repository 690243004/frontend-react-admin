module.exports = {
  presets: ['@babel/env', '@babel/preset-react'],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel'
    //  ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }, "ant"]
  ]
}

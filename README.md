# split-source-webpack-plugin

[简体中文](./README-zh.md)

This is a [webpack](https://github.com/webpack/webpack) plugin which is also based on [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin). It is used to split lib code from your project. The difference between this plugin and [dll](https://webpack.js.org/plugins/dll-plugin/) is that dll will bundle the lib code to one `js` file (This file will also be very big sometime), and this plugin can split lib code to different `script` tag. This plugin can save project users' time on production environment.

## Install

```bash
npm install split-source-webpack-plugin --save-dev
```

## Usage

```javascript
var HTMLWebpackPlugin = require('html-webpack-plugin')
var SplitSourceWebpackPlugin = require('split-source-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new HTMLWebpackPlugin(),
    new SplitSourceWebpackPlugin([
      {
        libName: 'xx',
        globalName: 'yy',
        url: 'http://url'
      }
    ])
  ]
}
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|[libName](#)|`{String}`|''|The name of library which is used in project. For example, if `Vue` is required in project: `var Vue = require('vue')`, then libName should be set as `vue`|
|[globalName](#)|`{String}`|''|The name of library under global environment. For example, if `Vue` is required in project: `var Vue = require('vue')`, then globalName should be set as `Vue`|
|[url](#)|`{String}`|''|The source address of library. It can be local address or `CDN` address.|

## Changelog

- 2018.07.20 v0.1.0
  - support split lib source from project
  - add examples based on `webpack3` & `webpack4`
  - add `README` files
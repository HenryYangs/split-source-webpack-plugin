# split-source-webpack-plugin

该插件基于[webpack](https://github.com/webpack/webpack)和[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)。主要想解决的问题是当项目中的库较多时，即使使用`webpack`的[dll](https://webpack.js.org/plugins/dll-plugin/)特性，仍然会将所有库文件打入同一个`js`文件中，如果使用的库较多，该文件依然会很大。使用本插件，可以将库文件一一转化成`script`标签添加到`HTML`中，可以极大提高项目在生产环境中访问速度。

## 安装

```bash
npm install split-source-webpack-plugin --save-dev
```

## 使用

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
        url: 'http://www.host.com/lib/name/${version}'
      }
    ])
  ]
}
```

## 配置选项

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|[libName](#)|`{String}`|''|库的名称。例如项目中需要引入`Vue`: `var Vue = require('vue')`, 那么，libName就应该配置`vue`。|
|[globalName](#)|`{String}`|''|库在全局的名称。例如项目中需要引入`Vue`: `var Vue = require('vue')`, 那么，globalName就应该配置`Vue`。|
|[url](#)|`{String}`|''|库的请求地址，可以根据需求配置项目服务器上的地址或`CDN`地址。同时也可以在url中加入`${version}`用来指示插件从`package.json`中自动获取版本信息|

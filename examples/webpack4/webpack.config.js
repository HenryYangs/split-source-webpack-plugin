var path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin')
var splitSourceWebpackPlugin = require('./../../index.js')

module.exports = {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin(),
        new splitSourceWebpackPlugin(
            [
                {
                    libName: 'vue',
                    globalName: 'Vue',
                    url: 'https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.min.js'
                },
                {
                    libName: 'vue-router',
                    globalName: 'VueRouter',
                    url: 'https://unpkg.com/vue-router@3.0.1/dist/vue-router.js'
                }
            ]
        )
    ]
}
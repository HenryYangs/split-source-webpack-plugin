/**
 * @file split your lib code before webpack inject js files
 * @author Henry Yang
 */

var path = require('path')
var fs = require('fs')
var pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json')).toString())

function splitSourceWebpackPlugin (options) {
    this.options = options
}

function injectSource (settings) {
    var compilation = settings.compilation
    var scripts = settings.scripts
    var externals = settings.externals
    var callback = settings.callback
    var htmlPluginData = settings.htmlPluginData

    if (!compilation.options.externals) {
        compilation.options.externals = {}
    }

    for (var key in externals) {
        compilation.options.externals[key] = externals[key]
    }

    for (var i = scripts.length - 1; i >= 0; i--) {
        htmlPluginData.assets.js.unshift(scripts[i])
    }

    callback(null, htmlPluginData)
}

splitSourceWebpackPlugin.prototype.apply = function (compiler) {
    var opts = this.options
    var scripts = []
    var externals = {}
    var dependencies = pkg.dependencies

    opts.forEach(function (item) {
        var version = dependencies[item.libName].match(/[0-9\.]+/)[0]

        externals[item.libName] = item.globalName
        scripts.push(item.url.replace(/\$\{version\}/, version))
    })

    console.log(opts)

    if (compiler.hooks) { // webpack 4
        compiler.hooks.compilation.tap('htmlWebpackScriptPlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('htmlWebpackScriptPlugin', (htmlPluginData, callback) => {
                console.log('webpack4')
                injectSource({
                  compilation: compilation,
                  scripts: scripts,
                  externals: externals,
                  callback: callback,
                  htmlPluginData: htmlPluginData
                })
            })
        })
    } else {
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
                console.log('webpack3')
                injectSource({
                  compilation: compilation,
                  scripts: scripts,
                  externals: externals,
                  callback: callback,
                  htmlPluginData: htmlPluginData
                })
            })
        })
    }
}

module.exports = splitSourceWebpackPlugin

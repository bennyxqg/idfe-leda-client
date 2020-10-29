const path = require('path')
const paths = require('react-scripts/config/paths')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { override, setWebpackPublicPath, fixBabelImports, addWebpackPlugin, disableEsLint, overrideDevServer, watchAll, addLessLoader } = require('customize-cra');
const fs = require('fs');

const envConfig = process.env.env_config

let publicPath = ''
if(envConfig !== 'dev') {
  publicPath = '/' + process.env.REACT_APP_PATH
}

const envConfigData = {
  dev: {
    evnFlag: 'dev'
  },
  dev_build: {
    buildPath: 'dist/dist_dev' + publicPath, // 编译目录
    evnFlag: 'dev_build'
  },
  test: {
    buildPath: 'dist/dist_test' + publicPath,
    evnFlag: 'test'
  },
  sandbox: {
    buildPath: 'dist/dist_sandbox' + publicPath,
    evnFlag: 'sandbox'
  },
  prod: {
    buildPath: 'dist/dist_prd' + publicPath,
    evnFlag: 'prod'
  }
}

if(envConfig === 'sandbox' || envConfig === 'prod' || envConfig === 'test' || envConfig === 'dev_build') { // 区分环境打包
  paths.appBuild = path.join(path.dirname(paths.appBuild), envConfigData[envConfig].buildPath);
}

const fillLog = (text) => {
  fs.mkdir('./buildLogs', function (err) {
    if (!err) {
        fs.writeFile('./buildLogs/log.txt', text, function (err) {
            if (err) {
                console.log('写入失败', err);
            } else {
                console.log('写入成功');
            }
        })
    }

})
}


const extra_config= ()=>(config, env)=>{
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src')
  }
  config.plugins[0].options = {
    ...config.plugins[0].options,
    'publicPath': publicPath
  }
  // config.plugins[0].options.publicPath = 'sdsadsad'
  // fillLog(JSON.stringify(config.module.rules))
  // fillLog(JSON.stringify(config.plugins[0].options))
  return config;
}

let buildTime = (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString()
buildTime = '"' + buildTime + '"'
module.exports = {
  webpack: override(
    // usual webpack plugin
    extra_config(),
    disableEsLint(),
    fixBabelImports('import', {  //antd UI组件按需加载的处理
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader({
      strictMath: true,
      noIeCompat: true,
      localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    }),
    // addCssLoader({
    //   minimize:true,
    //   modules:true
    // }),
    setWebpackPublicPath(publicPath), // 二级目录
    addWebpackPlugin(
      new webpack.DefinePlugin({ // 全局变量
        'process.env': {
          'buildTime': buildTime,
          publicPath: '"' + publicPath + '"',
          evnFlag: '"' + envConfigData[envConfig].evnFlag + '"'
        }
      }),
      new HtmlWebpackPlugin({
        versionTime: `123213`,
      })
      // new ExtractTextPlugin({
      //   filename: '../dist/css/style.css', // 从 .js 文件中提取出来的 .css 文件的名称
      // }),
      // new CopyWebpackPlugin([ // 不生效
      //   {
      //     from: 'src/copyTest',
      //     to: 'copyTest'
      //   },
      //   {
      //     from: 'README.md',
      //     to: 'README.md'
      //   }
      // ])
    )
  ),
  // devServer: overrideDevServer(
  //   // dev server plugin
  //   watchAll()
  // )
  devServer: overrideDevServer((config) => {
      config.proxy = {
        '/config': {
            target: 'http://sandbox-ipggsd.gamdream.com',
            secure: false,
            changeOrigin: true
        },
        '/adminApi': {
          target: 'http://192.168.4.124:8010',
          // target: 'http://192.168.115.60:8079',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/adminApi': ''
          }
        },
        '/reportApi': {
          target: 'http://dlog-h5.uu.cc',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/reportApi': ''
          }
        },
      }
      return config
    },
    // watchAll()
  ),
};
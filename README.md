
> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:80
npm run dev

# build for production with minification
# 执行 build 命令后，得到 dist 文件，为最终生成环境文件
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 项目结构说明
    > .vscode         vscode编辑器配置，可忽略
    > build           项目构建目录，可忽略
    > config          项目配置文件，可配置反向代理域名等
    > node_modules    引入依赖包，可忽略
    > src             项目开发主目录
        | assets          本地图片，样式库目录
        | components      公共模块目录
        | router          路由配置目录
        | routes          页面文件目录
        | services        请求配置目录
        | store           Vuex
        | App.vue         Vue文件
        | main.js         主js文件
    > static          静态文件，可放入一些静态文件
    > .babelrc        配置文件，可忽略
    > .editorconfig   配置文件，可忽略
    > .eslintignore   配置文件，可忽略
    > .eslintrc.js    配置文件，可忽略
    > .gitignore      git文件忽略配置文件
    > .postcssrc.js   配置文件，可忽略
    > index.html      项目主文件，可忽略
    > npm-debug.log   npm日志文件
    > package.json    项目包管理配置文件
    > README.md       readme
    > yarn.lock       配置文件，可忽略

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

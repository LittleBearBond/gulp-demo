一般我们是多个项目同时开发，但是配置文件都是一样的。为了配置文件和node_modules能重用，我们需要做一些处理。

开发过程中使用监听功能动态处理 sass文件、es6文件，并在某些类型文件发生变化时自动刷新浏览器
开发完毕后把文件（css，js）打包、压缩，减少在生产环境下的文件大小及数量

#启动监听
>gulp work  --name project01(项目名字，在project下)

#发布项目
>gulp publish  --name project01(项目名字，在project下)

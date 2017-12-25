## 前言

初学vue.js，官网的文档写的很清楚，看着不难。俗话说：光说不练假把式。程序猿学个新东西还是要敲出来看看效果比较好。最开始是想搞个音乐类的，毕竟天天都会听歌，但发现搞音乐类的太多了，我再搞个多没意思。考虑了一下，还是搞个看书的吧，这个还是很少有人搞的。找了找发现只有追书神器的api暴露出来了，起点之类的api找不到。最终效果因为api数据的限制，参考了起点中文网app、起点中文网web端，以及追书神器web端，再加上自己的一些想法搞出来的。项目中的小图标使用的是[阿里巴巴的矢量图标库Iconfont](http://www.iconfont.cn/)。

## 技术栈
vue2 + vuex + vue-router + webpack + ES6 + axios + sass

## 源码地址
[https://github.com/XNAL/ReadMore](https://github.com/XNAL/ReadMore) 

## 访问地址
- [请访问地址：http://www.tdon.site/read-more/](http://www.tdon.site/read-more/)（pc端请用chrome手机模式预览）        
- 扫描下面的二维码

![二维码](https://github.com/XNAL/ReadMore/blob/master/screenshorts/new-qrcode.png)

## 项目运行

```   
git clone https://github.com/XNAL/ReadMore
cd ReadMore
npm install

npm run dev（本地运行 访问：http://localhost:8080）

npm run build （部署上线 生成的dist文件夹放到服务器中即可：需要配置代理，如使用nginx，可参考下面问题中的配置）
```

## 说明

- 目前只做了第一个版本，还存在一些需要进行优化的细节问题，后续会继续进行维护更新。如果发现什么问题，也欢迎跟我联系反馈。
- 如果觉得做的还行，对您有所帮助，欢迎“start”一下。

## 开发中遇到的一些问题

- 多个子组件循环，父组件如何处理加载状态（精选页面）
```
每个子组件加载完后是同`this.$emit`通知父组件，父组件判断所有子组件加载完成后隐藏loading。
```

- #### 跳转页面后active标记
```
最开始使用url.indexOf来处理，后来直接发现vue-router的exact属性更好用。
```
    
- #### 调用第三方api接口时跨域的问题
```
1. 本地使用proxyTbale

    在config/index.js中添加配置：
    
    '/api': {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {                
            '^/api': ''
        }   
    }
    

2. 部署服务器后通过nginx代理

    nginx中配置：
    
    location /api/ {
            proxy_pass http://api.zhuishushenqi.com/;
        }

3. 调用接口时只需要以`/api`开头就可以
```
        
- #### 服务器部署后vue-router的虚拟路由在刷新时出现404页面
```
修改nginx配置：

location / {
        try_files $uri $uri/ @router;          //增加的内容
        root /home/don/book;
        index index.html;
}
    
location @router {                          //增加的内容
    rewrite ^.*$ /index.html last;          //增加的内容
}                                           //增加的内容
````

## 部分截图

#### 我的书架

![我的书架](https://github.com/XNAL/ReadMore/blob/master/screenshorts/shelf-01.png)


![我的书架](https://github.com/XNAL/ReadMore/blob/master/screenshorts/shelf-02.png)

#### 精选

![精选](https://github.com/XNAL/ReadMore/blob/master/screenshorts/featured.png)

#### 分类

![分类](https://github.com/XNAL/ReadMore/blob/master/screenshorts/category.png)
![分类](https://github.com/XNAL/ReadMore/blob/master/screenshorts/category-02.png)
![分类](https://github.com/XNAL/ReadMore/blob/master/screenshorts/category-03.png)

#### 排行

![排行](https://github.com/XNAL/ReadMore/blob/master/screenshorts/rank.png)

#### 书籍详情

![书籍详情](https://github.com/XNAL/ReadMore/blob/master/screenshorts/book.png)

#### 看书

![看书](https://github.com/XNAL/ReadMore/blob/master/screenshorts/read-01.png)
![看书](https://github.com/XNAL/ReadMore/blob/master/screenshorts/read-02.png)
![看书](https://github.com/XNAL/ReadMore/blob/master/screenshorts/read-03.png)
![看书](https://github.com/XNAL/ReadMore/blob/master/screenshorts/read-04.png)

#### 搜索

![搜索](https://github.com/XNAL/ReadMore/blob/master/screenshorts/search.png)
![搜索](https://github.com/XNAL/ReadMore/blob/master/screenshorts/search-02.png)



















# vue项目常见问题
## 1. 初始显示异常
    问题: Cannot read property '0' of undefined"
    原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
    解决: 使用v-if指令
    
    问题: Cannot read property 'avatar' of null"
    原因: 初始值是null, 而模块中直接显示2层表达式
    解决: 初始值为{}


# day01
## 1. 项目开发的准备
    如何描述项目: 项目功能, 项目的主要功能模块, 主要的技术, 开发的模式
    技术选型: 数据展现/用户交互/前后台交互/模块化/组件化/工程化/样式/滑动库
    接口相关概念: 接口/接口文档/对接口/联调/前后台分离/mock数据接口

## 2. 搭建项目骨架
    vue-cli
    vue
    webpack
    eslint
    vue-router
    stylus/stylus-loader
      结构化
      变量/函数
      mixins: 样式代码的复用
    
## 3. mock数据接口
    理解前后台分离
    设计json数据
        结构: 名称/类型
        值
        mock数据与真实数据的区别: 结构一样, 而值不一样
    将json数据暴露成接口
        express: 可以在浏览器/postman上直接访问测试   打包运行接口不可访问    数据值是不可变的
        mockjs:  不可以                             可以                   数据值可以随机产生
        注意: express方式在新版本的脚手架项目中不可用
    ajax请求mock接口
        vue-resource: vue1.x项目中使用
        axios: vue2.x推荐使用
        包装ajax请求
        
## 4. 使用vuex
    管理状态: goods/ratings/seller
    index: vuex核心的store对象模块, 配置state/mutations/actions/getters
    state: vuex管理的状态
    mutations: 直接更新状态的n个行为
    actions: 包含n个由组件触发间接更新状态的行为(可以发送ajax请求)
    getters: 基于vuex的状态的getter计算属性
    types: 包含所有mutation函数名

## 5. 实现header静态组件
    使用stylus根据标注图编写移动端的布局
    1px边框
    stick footer(粘连)布局
    2x图与3x图
    图标字体
    
# day02
## 1. header动态组件

## 2. star组件

## 3. goods组件

    1. 滑动右侧列表, 左侧更新(代表当前分类的样式变化)
    
    2. 点击左侧某个分类, 右侧列表滑动到对应位置

## 4. cartcontrol组件



    


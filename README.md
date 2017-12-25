# vue项目常见问题
## 1. 初始显示异常
    情况1: Cannot read property '0' of undefined"
    原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
    解决: 使用v-if指令
    
    情况2: Cannot read property 'avatar' of null"
    原因: 初始值是null, 而模块中直接显示2层表达式
    解决: 初始值为{}

## 2. 在组件中, 非组件的回调函数中更新状态, 界面不变化
    原因: 非组件的回调函数中的this不是组件对象
    解决: 使用箭头函数定义回调函数    

## 3. 创建好BScroll对象, 样式都生成了, 就是不能滑动
    原因: 创建BScroll对象时, 列表没有显示(状态已经更新, 但列表更新是异步的)
    解决: 在列表更新之后才创建BScroll对象: this.$nextTick(() => {创建BScroll对象})

## 4. 更新状态数据, 对应的界面不变化
    原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
    解决: this.$set(obj, 'xxx', value)才有数据绑定
          Vue.set(obj, 'xxx', value)才有数据绑定

## 5. 点击添加购物项, 会1次添加多个
    原因: 创建了多个BScroll对象来管理同一个DOM元素
    解决: 只创建一个BScroll对象 
    扩展: 单例对象: 
        创建前, 先判断是否已经存在, 只有不存在才创建
        创建后, 保存创建的对象

## 6. 点击添加购物项时, 同时还打开食物详情
    原因: 外部元素也响应了点击事件, 因为事件有冒泡
    解决: 停止事件冒泡 @click.stop="xxx"

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
    动态请求后台获取数据
      api/index.js:  使用axios定义发送ajax请求的方法, 方法返回的是promise对象
      store/actions.js: 定义调用api模块的方法异步发送ajax请求, 获取数据, 成功之后更新状态
      组件中在mounted()中, 通过this.$store.dispatch('requestSeller')从后台获取数据更新状态
      组件中通过mapState()得到store中seller状态
      在模板中通过表达式或指令来动态显示数据
    过渡动画
      <transition name="xxx">
      transition样式 (.xxx-enter-active,.xxx-leave-active)
      定义隐藏时的样式 (.xxx-enter, .xxx-leave-to)
    
## 2. star组件
    组件的作用
       复用
       简化
    vue组件编写的流程
       创建组件文件夹, 创建vue文件
       分析并设计出组件的props
       在父组件中使用此组件
          引入组件
          映射标签
          使用标签
       实现组件中的template/style/script
          初始化
          交互
    在模板中需要的数据, 从哪取
       props
       data
       computed
          自定义的
          映射的vuex的(mapState(), mapGetters())
        
## 3. goods组件
    动态展现列表数据
    基本滑动:
        使用better-scroll
        理解其基本原理
        创建BScroll对象的时机
     滑动右侧列表, 左侧同步更新
        better-scroll禁用了原生的dom事件, 使用的是自定义事件
        绑定监听: scroll/scrollEnd
        滚动监听的类型: probeType
        列表滑动的3种类型
            手指触摸
            惯性
            编码
    点击左侧列表项, 右侧滑动到对应位置
    
    实现计算属性
        分析出相关的数据
        分析出计算的逻辑
    
# day03
## 1. cartcontrol组件
    使用vuex管理food的count
    transition动画
    
## 2. shopcart组件
    BScroll的创建和刷新
    如何实现单例对象
    
## 3. food组件
    父组件中调用子组件的方法: this.$refs.child.fn()
    列表的过滤显示: 计算属性-->arr.filter()-->过滤逻辑的分析
    
## 4. ratingselect组件
    vue自定义事件机制
        绑定事件监听: 父组件中, 通过子组件标签 @xxx='fn'
        分发事件: 子组件中, this.$emit('xxx', data)
    
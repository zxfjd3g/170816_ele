<template>
  <div class="loginContainer">
    <head-top headTitle="登录" goBack="true"/>

    <div class="tab">
      <div class="tab-item" @click="setLoginWay(false)" :class="{current: !loginWay}">密码登录</div>
      <div class="tab-item" @click="setLoginWay(true)" :class="{current: loginWay}">短信登录</div>
    </div>

    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="手机号" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">
          获取验证码
        </button>
        <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>

    <form class="loginForm" v-else>
      <section class="input_container">
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input type="password" placeholder="密码" v-model="passWord" v-if="!showPassword">
        <input type="text" placeholder="密码" v-model="passWord" v-else>
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>

    <p class="login_tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
      注册过的用户可凭账号密码登录
    </p>

    <div class="login_container" @click="login">登录</div>

    <alertTip v-if="showAlert"
              :showHide="showAlert"
              @closeTip="closeTip"
              :alertText="alertText"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import headTop from 'components/header/head.vue'
  import alertTip from 'components/alertTip/alertTip.vue'
  import {imgBaseUrl} from 'common/utils/env'
  import {getcaptchas, mobileCode, phoneLogin, accountLogin} from 'api'

  export default {
    data() {
      return {
        loginWay: false, //登录方式，默认密码登录
        showPassword: false, // 是否显示密码
        phoneNumber: null, //电话号码
        mobileCode: null, //短信验证码
        validate_token: null, //获取短信时返回的验证值，登录时需要
        computedTime: 0, //倒数记时
        userInfo: null, //获取到的用户信息
        userAccount: null, //用户名
        passWord: null, //密码
        captchaCodeImg: null, //验证码地址
        codeNumber: null, //验证码
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
      }
    },

    created() {
      this.getCaptchaCode()
    },

    computed: {
      //判断手机号码
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    },
    methods: {
      ...mapActions([
        'recordUserinfo',
      ]),

      // 设置登录方式
      setLoginWay(loginWay) {
        this.loginWay = loginWay
      },
      //是否显示密码
      changePassWordType() {
        this.showPassword = !this.showPassword
      },
      // 获取图形验证码
      async getCaptchaCode() {
        let res = await getcaptchas()
        this.captchaCodeImg = res.code
      },
      // 获取短信验证码
      async getVerifyCode() {
        if (this.rightPhoneNumber) {
          this.computedTime = 30
          this.timer = setInterval(() => {
            this.computedTime--
            if (this.computedTime == 0) {
              clearInterval(this.timer)
            }
          }, 1000)
          //发送短信验证码
          let res = await mobileCode(this.phoneNumber) // {"code": 0}
          if (res.message) {
            this.showAlert = true
            this.alertText = res.message
            return
          }
          this.validate_token = res.validate_token
        }
      },
      // 发送登录信息
      async login() {
        if (this.loginWay) {
          if (!this.rightPhoneNumber) {
            this.showAlert = true;
            this.alertText = '手机号码不正确'
            return
          } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
            this.showAlert = true;
            this.alertText = '短信验证码不正确'
            return
          }

          //手机号登录
          const result = await phoneLogin(this.phoneNumber, this.mobileCode);
          if(result.code===0) {
            this.userInfo = result.data
          } else {
            this.userInfo = {
              message: '登陆失败, 手机号或验证不正确'
            }
          }
          /*
          {
            code : 1
          }
          {
            "code": 0,
            "data": {
              user_id: 3,
              phone: '13716962345'
            }
          }
           */

        } else {
          if (!this.userAccount) {
            this.showAlert = true
            this.alertText = '请输入手机号/邮箱/用户名'
            return
          } else if (!this.passWord) {
            this.showAlert = true;
            this.alertText = '请输入密码'
            return
          } else if (!this.codeNumber) {
            this.showAlert = true
            this.alertText = '请输入验证码'
            return
          }

          //用户名登录
          this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber)
        }
        //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!this.userInfo.user_id) {
          this.showAlert = true
          this.alertText = this.userInfo.message
          if (!this.loginWay) this.getCaptchaCode()
        } else {
          this.recordUserinfo(this.userInfo)
          this.$router.back()
        }
      },
      // 关系提示框
      closeTip() {
        this.showAlert = false
      }
    },
    components: {
      headTop,
      alertTip,
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin';

  .loginContainer {
    padding-top: 1.95rem;
    p, span {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
    input {
      height: 1.5rem;
      outline: none;
    }

    .tab {
      height: 40px;
      line-height: 40px;
      .tab-item {
        float: left;
        width: 50%;
        text-align: center;
        font-size: 14px;
      }
      .current {
        background: $yellow;
      }
    }

    .loginForm {
      background-color: #fff;
      margin-top: .6rem;
      .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
        input {
          @include sc(.7rem, #666);
        }
        .button_switch {
          background-color: #ccc;
          display: flex;
          justify-content: center;
          @include wh(2rem, .7rem);
          padding: 0 .2rem;
          border: 1px;
          border-radius: 0.5rem;
          position: relative;
          .circel_button {
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
            background-color: #f1f1f1;
            border-radius: 50%;
          }
          .trans_to_right {
            transform: translateX(1.3rem);
          }
          span {
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
          }
          span:nth-of-type(2) {
            transform: translateY(-.08rem);
          }
        }
        .change_to_text {
          background-color: #4cd964;
        }
        button {
          @include sc(.65rem, #fff);
          font-family: Helvetica Neue, Tahoma, Arial;
          padding: .28rem .4rem;
          border: 1px;
          border-radius: 0.15rem;
        }
        .right_phone_number {
          background-color: #4cd964;
        }
      }
      .phone_number {
        padding: .3rem .8rem;
      }
      .captcha_code_container {
        height: 2.2rem;
        .img_change_img {
          display: flex;
          align-items: center;
          img {
            @include wh(3.5rem, 1.5rem);
            margin-right: .2rem;
          }
          .change_img {
            display: flex;
            flex-direction: 'column';
            flex-wrap: wrap;
            width: 2rem;
            justify-content: center;
            p {
              @include sc(.55rem, #666);
            }
            p:nth-of-type(2) {
              color: #3b95e9;
              margin-top: .2rem;
            }
          }
        }
      }
    }
    .login_tips {
      @include sc(.5rem, red);
      padding: .4rem .6rem;
      line-height: .5rem;
      a {
        color: #3b95e9;
      }
    }
    .login_container {
      margin: 0 .5rem 1rem;
      @include sc(.7rem, #fff);
      background-color: $yellow;
      padding: .5rem 0;
      border: 1px;
      border-radius: 0.15rem;
      text-align: center;
    }
  }
</style>

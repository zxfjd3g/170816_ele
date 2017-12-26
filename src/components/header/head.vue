<template>
  <header class='head_top'>
    <slot name='search'></slot>

    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
      <svgImage className="search_guide" type='#icon-jiantou2'/>
    </section>

    <router-link class="head_login" :to="userInfo ? '/profile':'/login'" v-if='signinUp'>
      <svgImage className="user_avatar" type="#icon-person" v-if="userInfo"/>
      <span class="login_span" v-else>登录|注册</span>
    </router-link>

    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>

    <slot name="msite-title"></slot>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: ['signinUp', 'headTitle', 'goBack'],
    mounted() {
      //获取用户信息
      this.$store.dispatch('getUserInfo')
    },
    computed: {
      ...mapState(['userInfo']),
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin';

  .head_top {
    background-color: $green;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
    .head_goback {
      left: 0.4rem;
      @include wh(0.6rem, 1rem);
      line-height: 2.2rem;
      margin-left: .4rem;
      .search_guide {
        width: 100%;
        height: 100%;
      }
    }
    .head_login {
      right: 0.55rem;
      @include sc(0.65rem, #fff);
      @include ct;
      .login_span {
        color: #fff;
      }
      .user_avatar {
        fill: #fff;
        @include wh(1.2rem, 1.2rem);
      }
    }
    .title_head {
      @include center;
      width: 50%;
      color: #fff;
      text-align: center;
      .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>

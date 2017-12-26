<template>
  <div class="search">
    <head-top headTitle="搜索"></head-top>
    <form class="search_form">
      <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input">
      <input type="submit" name="submit" class="search_submit">
    </form>
  </div>
</template>

<script>
  import headTop from 'components/header/head'

  export default {
    components: {
      headTop,
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../common/style/mixin';

  .search {
    margin-bottom: 2rem;
    .search_form {
      background-color: #fff;
      padding: 0.5rem;
      display: flex;
      input {
        height: 1.5rem;
      }
      .search_input {
        flex: 4;
        border: 0.025rem solid $bc;
        @include sc(0.65rem, #333);
        border-radius: 0.125rem;
        background-color: #f2f2f2;
        font-weight: bold;
        padding: 0 0.25rem;
      }
      .search_submit {
        flex: 1;
        border: 0.025rem solid $green;
        margin-left: .2rem;
        @include sc(0.65rem, #fff);
        border-radius: 0.125rem;
        background-color: $green;
        font-weight: bold;
        padding: 0 0.25rem;
      }
    }
  }
</style>

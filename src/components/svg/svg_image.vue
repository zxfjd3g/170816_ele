<template>
  <svg :class="className" >
    <use :xlink:href="type"></use>
  </svg>
</template>

<script>

  export default {
    props: ['className', 'type']
  }
</script>

<style>

</style>
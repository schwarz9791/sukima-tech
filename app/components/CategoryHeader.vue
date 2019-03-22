<template lang="pug">
  h3.categoryTitle {{ title }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.categoryTitle
  display inline-block
  width 100%
  font-size 24px
  text-align center
</style>

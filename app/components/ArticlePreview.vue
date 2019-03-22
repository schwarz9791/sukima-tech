<template lang="pug">
  el-card.article(:body-style='{ width: "100%" }')
    .image
      img(:src='image.url')
    h4.title {{ title }}
    p.description {{ description }}
    .action
      el-button(
        @click='clickMore'
        size='mini'
        icon='el-icon-info'
        round
      )
      | more
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    clickMore() {
      this.$router.push(`/articles/${this.id}`)
    }
  }
}
</script>

<style lang='stylus' scoped>
.article
  width 25%

  .el-card__body
    width 100%

  .image
    position relative
    width 100%
    overflow hidden

    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      object-fit cover

    &::before
      content ''
      display block
      padding-top 100%
</style>

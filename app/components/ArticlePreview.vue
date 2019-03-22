<template lang="pug">
  el-card.article(
    shadow='hover'
  )
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
@import '../assets/styles/variables'

.article
  position relative
  width calc(25% - 1em)
  overflow visible
  border none
  border-radius 6px

  &:hover
    .action
      opacity 1

  + .article
    margin-left 1em

  .title
    font-size font-size-lg
    text-align center
    text-overflow ellipsis
    overflow hidden
    white-space nowrap

  .description
    display -webkit-box
    -webkit-line-clamp 3
    /* autoprefixer: ignore next */
    -webkit-box-orient vertical
    overflow hidden

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

  .action
    position absolute
    right 1em
    bottom -1em
    opacity 0
    transition opacity 0.3s
</style>

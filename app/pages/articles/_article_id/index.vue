<template lang="pug">
  section.container
    .image
      img(:src='imageUrl')
    .content
      h2.title {{ article.title }}
      p.body {{ article.body }}
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ShowArticle',
  computed: {
    ...mapState('articles', ['article']),
    isLoading() {
      return !this.article.id
    },
    articleId() {
      return this.$route.params.article_id
    },
    imageUrl() {
      return this.article.image ? this.article.image.url : ''
    }
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (newValue !== oldValue) this.updateLoading(newValue)
    }
  },
  async created() {
    await this.bindSingle(this.articleId)
  },
  destroyed() {
    this.unbindSingle()
  },
  methods: {
    ...mapActions('articles', ['bindSingle', 'unbindSingle']),
    ...mapMutations(['updateLoading'])
  }
}
</script>

<style lang='stylus' scoped>
@import '../../../assets/styles/variables'

.container
  display flex
  flex-wrap wrap
  width 100%
  max-width 1200px
  margin 0 auto

.image
  position relative
  width 20vw
  height 20vw
  border-radius 6px
  box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
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

.content
  width calc(100% - 20vw)
  padding 1em

  .title
    font-size font-size-xlg

  .body
    white-space pre-line
</style>

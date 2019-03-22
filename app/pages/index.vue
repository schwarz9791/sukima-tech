<template lang="pug">
  section.container
    section.topView
      logo
      h1.title
        | SUKIMA TECHNOLOGY
      h2.subtitle
        | ヒトとヒト、モノとモノ、ヒトとモノ
        br
        | スキマを繋ぐ技術
      //- .description
        | Now constructing...
    section.categories
      template(v-for='category in categories')
        category-header(:title='category.name')
        template(
          v-for='article in articles.filter(article => article.category === category.id)'
        )
          article-preview(
            :id='article.id'
            :title='article.title'
            :description='article.description'
            :image='article.image'
          )

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Logo from '~/components/Logo.vue'
import CategoryHeader from '~/components/CategoryHeader.vue'
import ArticlePreview from '~/components/ArticlePreview.vue'

export default {
  components: {
    Logo,
    CategoryHeader,
    ArticlePreview
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('categories', ['categories']),
    ...mapState('articles', ['articles']),
    isLoading() {
      return !this.categories.length && this.articles.length
    }
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (newValue !== oldValue) this.updateLoading(newValue)
    }
  },
  created() {
    this.bindCategories()
    this.bindArticles()
  },
  destroyed() {
    this.unbindCategories()
    this.unbindArticles()
  },
  methods: {
    ...mapActions('categories', {
      bindCategories: 'bind',
      unbindCategories: 'unbind'
    }),
    ...mapActions('articles', {
      bindArticles: 'bind',
      unbindArticles: 'unbind'
    }),
    ...mapMutations(['updateLoading'])
  }
}
</script>

<style lang='stylus' scoped>
.container
  width 100%
  min-height 100vh
  display flex
  flex-wrap wrap
  justify-content center
  align-items center
  text-align center

  .topView
    flex-shrink 0
    width 100%

    .title
      // font-family 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
      display block
      font-weight 500
      font-size 36px
      color #35495e
      letter-spacing 1px
      line-height 1.75

    .subtitle
      font-weight 300
      font-size 24px
      color #526488
      word-spacing 5px
      padding-bottom 15px

    .description
      font-weight 300
      font-size 18px
      color #526488
      word-spacing 5px
      padding-bottom 15px

    .links
      padding-top 15px

  .categories
    display flex
    flex-wrap wrap
</style>

<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      p edit article - {{ articleId }}
      el-form(v-if='!isLoading' ref='article' :model='article')
        el-form-item(label='title')
          el-input(v-model='title')
        el-form-item(label='description')
          el-input(v-model='description')
        el-form-item(label='body')
          el-input(v-model='body')
      br
      nuxt-link(to="/admin") Go admin top
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'EditArticle',
  computed: {
    ...mapState('articles', ['article']),
    isLoading() {
      return !this.article
    },
    articleId() {
      return this.$route.params.article_id
    },
    title: {
      get() {
        return this.article.title
      },
      set(value) {
        this.updateSingle({
          title: value
        })
      }
    },
    description: {
      get() {
        return this.article.description
      },
      set(value) {
        this.updateSingle({
          description: value
        })
      }
    },
    body: {
      get() {
        return this.article.body
      },
      set(value) {
        this.updateSingle({
          body: value
        })
      }
    }
  },
  created() {
    this.bindSingle(this.articleId)
  },
  destroyed() {
    this.unbindSingle()
  },
  methods: {
    ...mapActions('articles', ['bindSingle', 'unbindSingle', 'updateSingle'])
  }
}
</script>

<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      h3 article list
      ul
        li(v-for="article in articles")
          nuxt-link(:to="`/admin/articles/${article._id}/edit`")
            | {{ article.title }}
      br
      nuxt-link(to="/admin") Go admin top
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ArticlesPage',
  computed: {
    ...mapState('articles', ['articles']),
    isLoading() {
      return !this.articles.length
    }
  },
  created() {
    this.bind()
  },
  destroyed() {
    this.unbind()
  },
  methods: {
    ...mapActions('articles', ['bind', 'unbind'])
  }
}
</script>

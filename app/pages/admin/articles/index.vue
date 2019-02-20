<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      h3 article list
      ul
        li(v-for="article in articles")
          nuxt-link(:to='`/admin/articles/${article.id}/edit`')
            | {{ article.title }}
      br
      nuxt-link(to='/admin/articles/create') Create
      br
      nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticlesPage',
  computed: {
    ...mapGetters('articles', ['articles']),
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

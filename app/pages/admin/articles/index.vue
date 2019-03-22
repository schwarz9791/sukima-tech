<template lang="pug">
  section.container
    h3 article list
    ul
      li(v-for='article in articles')
        nuxt-link(:to='`/admin/articles/${article.id}/edit`')
          | {{ article.title }}
    br
    nuxt-link(to='/admin/articles/create') Create
    br
    nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ArticlesPage',
  computed: {
    ...mapState('articles', ['articles']),
    isLoading() {
      return !this.articles.length
    }
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (newValue !== oldValue) this.updateLoading(newValue)
    }
  },
  created() {
    this.bind()
  },
  destroyed() {
    this.unbind()
  },
  methods: {
    ...mapActions('articles', ['bind', 'unbind']),
    ...mapMutations(['updateLoading'])
  }
}
</script>

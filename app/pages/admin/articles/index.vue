<template lang="pug">
  section.container
    h3 article list
    ul.mt-20(v-if='articles.length')
      li(v-for='article in articles')
        nuxt-link(:to='`/admin/articles/${article.id}/edit`')
          | {{ article.title }}
    div.emptyItems(v-else)
      | No articles
    el-divider
    el-button(@click='goto("/admin")') Go admin top
    el-button(@click='goto("/admin/articles/create")') Create
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
    ...mapMutations(['updateLoading']),
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>

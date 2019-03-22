<template lang="pug">
  section.container
    img(:src='article.image.url')
    h2 {{ article.title }}
    p {{ article.body }}
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ShowArticle',
  computed: {
    ...mapState('articles', ['article']),
    isLoading() {
      return !this.article || !this.article.id
    },
    articleId() {
      return this.$route.params.article_id
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

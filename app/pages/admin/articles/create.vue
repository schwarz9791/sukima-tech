<template lang="pug">
  div
    p create article
    article-editor(:article='article')
    el-button(@click='goBack()') Back
    el-button(type='primary' @click='saveArticle()' :disabled='isSaving')
      i.el-icon-loading(v-if='isSaving')
      | Create
    br
    nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ArticleEditor from '@/components/ArticleEditor.vue'

export default {
  name: 'CreateArticle',
  components: { ArticleEditor },
  data() {
    return {
      isSaving: false
    }
  },
  computed: {
    ...mapState('articles', ['article'])
  },
  created() {
    this.clearSingle()
  },
  methods: {
    ...mapActions('articles', ['bind', 'unbind', 'saveSingle']),
    ...mapMutations('articles', ['updateSingle', 'clearSingle']),
    goBack() {
      this.$router.back()
    },
    async saveArticle() {
      this.isSaving = true
      await this.bind()
      const id = await this.saveSingle()
      await this.unbind()
      this.isSaving = false
      this.$router.replace(`/admin/articles/${id}/edit`)
    }
  }
}
</script>

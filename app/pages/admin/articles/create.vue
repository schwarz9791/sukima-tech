<template lang="pug">
  section.container
    el-card
      p create article
      article-editor(
        ref='article'
        :article='article'
      )
      .text-right
        el-button(@click='goBack()') Back
        el-button(type='primary' @click='saveArticle()' :disabled='isSaving')
          i.el-icon-loading(v-if='isSaving')
          | Create
    .mt-15
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
    this.updateLoading(false)
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('articles', ['bind', 'unbind', 'saveSingle', 'uploadImage']),
    ...mapMutations('articles', ['updateSingle', 'clearSingle', 'setImage']),
    goBack() {
      this.$router.back()
    },
    async saveArticle() {
      this.isSaving = true
      await this.bind()
      if (this.$refs.article.uploads.length) {
        const uploadedFile = await this.uploadImage(
          this.$refs.article.fileList[0].raw
        )
        this.setImage({ image: _.cloneDeep(uploadedFile) })
      }
      const id = await this.saveSingle()
      await this.unbind()
      this.isSaving = false
      this.$router.replace(`/admin/articles/${id}/edit`)
    }
  }
}
</script>

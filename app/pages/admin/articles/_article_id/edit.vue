<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      p edit article - {{ articleId }}
      article-editor(
        v-if='!isLoading'
        ref='article'
        :id='articleId'
        :article='article'
      )
      el-button(@click='goBack()') Back
      el-button(type='danger' @click='deleteArticle()' :disabled='isSaving')
        i.el-icon-loading(v-if='isSaving')
        | Remove
      el-button(type='primary' @click='saveArticle()' :disabled='isSaving')
        i.el-icon-loading(v-if='isSaving')
        | Update
      br
      nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ArticleEditor from '@/components/ArticleEditor.vue'

export default {
  name: 'EditArticle',
  components: { ArticleEditor },
  data() {
    return {
      isSaving: false
    }
  },
  computed: {
    ...mapState('articles', ['article']),
    isLoading() {
      return !this.article
    },
    articleId() {
      return this.$route.params.article_id
    }
  },
  async created() {
    await this.bindSingle(this.articleId)
  },
  destroyed() {
    this.unbindSingle()
  },
  methods: {
    ...mapActions('articles', [
      'bindSingle',
      'unbindSingle',
      'saveSingle',
      'uploadImage'
    ]),
    ...mapMutations('articles', ['updateSingle', 'setImage']),
    goBack() {
      this.$router.back()
    },
    async saveArticle() {
      try {
        this.isSaving = true
        if (this.$refs.article.uploads.length) {
          const uploadedFile = await this.uploadImage(
            this.$refs.article.fileList[0].raw
          )
          this.setImage({ image: _.cloneDeep(uploadedFile) })
        }
        await this.saveSingle()
        this.isSaving = false
      } catch (e) {
        console.error(e.message)
      }
    },
    async deleteArticle() {
      this.isSaving = true
      this.updateSingle({ deleted: true })
      await this.saveSingle()
      this.isSaving = false
      this.$router.replace('/admin/articles')
    }
  }
}
</script>

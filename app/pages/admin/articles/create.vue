<template lang="pug">
  div
    p create article
    article-editor(
      ref='article'
      :article='article'
    )
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
    ...mapActions('articles', ['bind', 'unbind', 'saveSingle', 'uploadImage']),
    ...mapMutations('articles', ['updateSingle', 'clearSingle']),
    goBack() {
      this.$router.back()
    },
    // async handleUploadImage(files) {
    //   files.forEach(file => {
    //     try {
    //       this.uploadImage(file.raw)
    //     } catch (e) {
    //       console.log(e.message)
    //     }
    //   })
    // },
    async saveArticle() {
      this.isSaving = true
      await this.bind()
      const uploadedFile = await this.uploadImage(
        this.$refs.article.$refs.upload.fileList[0].raw
      )
      this.article.image = uploadedFile
      const id = await this.saveSingle()
      await this.unbind()
      this.isSaving = false
      this.$router.replace(`/admin/articles/${id}/edit`)
    }
  }
}
</script>

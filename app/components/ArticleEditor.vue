<template lang="pug">
  el-form(ref='article' :model='article')
    el-form-item(label='category')
      el-select(v-model='category')
        el-option(
          v-for='(category, index) in categories'
          :key='index'
          :label='category.name'
          :value='category.id'
        )
    el-form-item(label='title')
      el-input(v-model='title')
    el-form-item(label='description')
      el-input(v-model='description')
    el-form-item(label='body')
      el-input(v-model='body')
    el-form-item(label='image')
      el-upload(
        ref='upload'
        drag
        action=''
        list-type='picture-card'
        :on-change='handleAttachImage'
        :on-preview='handlePreview'
        :on-remove='handleRemove'
        :file-list='fileList'
        :auto-upload='false'
        :limit='limit'
        :class='{ isLimit: fileList.length >= limit }'
      )
        i.el-icon-plus
      el-dialog(:visible.sync='previewImageDialog')
        img(:src='previewImageUrl' width='100%')
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ArticleEditor',
  props: {
    id: {
      type: String,
      default: null
    },
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      uploads: [],
      previewImageUrl: '',
      previewImageDialog: false,
      limit: 1
    }
  },
  computed: {
    ...mapState('categories', ['categories']),
    category: {
      get() {
        return this.article.category || ''
      },
      set(value) {
        this.updateSingle({ category: value })
      }
    },
    title: {
      get() {
        return this.article.title || ''
      },
      set(value) {
        this.updateSingle({ title: value })
      }
    },
    description: {
      get() {
        return this.article.description || ''
      },
      set(value) {
        this.updateSingle({ description: value })
      }
    },
    body: {
      get() {
        return this.article.body || ''
      },
      set(value) {
        this.updateSingle({ body: value })
      }
    },
    deleted: {
      get() {
        return this.article.deleted || false
      },
      set(value) {
        this.updateSingle({ deleted: value })
      }
    },
    fileList: {
      get() {
        return this.uploads.length
          ? this.uploads
          : this.article.image
            ? [this.article.image]
            : []
      }
    }
  },
  destroyed() {
    this.clearSingle()
  },
  methods: {
    ...mapActions('articles', ['uploadImage']),
    ...mapMutations('articles', ['updateSingle', 'clearSingle', 'removeImage']),
    handleAttachImage(file) {
      this.uploads.push(_.cloneDeep(file))
    },
    handlePreview(file) {
      this.previewImageUrl = file.url
      this.previewImageDialog = true
    },
    handleRemove(file) {
      if (this.article.image) {
        this.removeImage()
      }
      if (this.uploads.length) {
        this.uploads.pop()
      }
    }
  }
}
</script>

<style lang="stylus">
.el-upload-dragger
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%
  border none

.el-upload-list__item-thumbnail
  object-fit cover

.isLimit
  .el-upload
    display none
</style>

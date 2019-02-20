<template lang="pug">
  el-form(ref='article' :model='article')
    el-form-item(label='title')
      el-input(v-model='title')
    el-form-item(label='description')
      el-input(v-model='description')
    el-form-item(label='body')
      el-input(v-model='body')
</template>

<script>
import { mapMutations } from 'vuex'

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
  computed: {
    title: {
      get() {
        return this.article.title
      },
      set(value) {
        this.updateSingle({ title: value })
      }
    },
    description: {
      get() {
        return this.article.description
      },
      set(value) {
        this.updateSingle({ description: value })
      }
    },
    body: {
      get() {
        return this.article.body
      },
      set(value) {
        this.updateSingle({ body: value })
      }
    },
    deleted: {
      get() {
        return this.article.deleted
      },
      set(value) {
        this.updateSingle({ deleted: value })
      }
    }
  },
  methods: {
    ...mapMutations('articles', ['updateSingle'])
  }
}
</script>

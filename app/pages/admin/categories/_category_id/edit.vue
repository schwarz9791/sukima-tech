<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      p edit category - {{ categoryId }}
      category-editor(
        v-if='!isLoading'
        :id='categoryId'
        :category='category'
      )
      el-button(@click='goBack()') Back
      el-button(type='primary' @click='saveCategory()' :disabled='isSaving')
        i.el-icon-loading(v-if='isSaving')
        | Save
      br
      nuxt-link(to="/admin") Go admin top
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CategoryEditor from '@/components/CategoryEditor.vue'

export default {
  name: 'EditCategory',
  components: { CategoryEditor },
  data() {
    return {
      isSaving: false
    }
  },
  computed: {
    ...mapState('categories', ['category']),
    isLoading() {
      return !this.category
    },
    categoryId() {
      return this.$route.params.category_id
    }
  },
  created() {
    this.bindSingle(this.categoryId)
  },
  destroyed() {
    this.unbindSingle()
  },
  methods: {
    ...mapActions('categories', ['bindSingle', 'unbindSingle', 'saveSingle']),
    goBack() {
      this.$router.back()
    },
    async saveCategory() {
      this.isSaving = true
      await this.saveSingle()
      this.isSaving = false
    }
  }
}
</script>

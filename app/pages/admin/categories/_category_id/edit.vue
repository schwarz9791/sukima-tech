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
      el-button(type='danger' @click='deleteCategory()' :disabled='isSaving')
        i.el-icon-loading(v-if='isSaving')
        | Remove
      el-button(type='primary' @click='saveCategory()' :disabled='isSaving')
        i.el-icon-loading(v-if='isSaving')
        | Update
      br
      nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
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
  async created() {
    await this.bindSingle(this.categoryId)
  },
  destroyed() {
    this.unbindSingle()
  },
  methods: {
    ...mapActions('categories', ['bindSingle', 'unbindSingle', 'saveSingle']),
    ...mapMutations('categories', ['updateSingle']),
    goBack() {
      this.$router.back()
    },
    async saveCategory() {
      this.isSaving = true
      await this.saveSingle()
      this.isSaving = false
    },
    async deleteCategory() {
      this.isSaving = true
      this.updateSingle({ deleted: true })
      await this.saveSingle()
      this.isSaving = false
      this.$router.replace('/admin/categories')
    }
  }
}
</script>

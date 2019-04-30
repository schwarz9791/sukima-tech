<template lang="pug">
  section.container
    el-card
      p create category
      category-editor(
        ref='category'
        :category='category'
      )
      .text-right
        el-button(@click='goBack()') Back
        el-button(type='primary' @click='saveCategory()' :disabled='isSaving')
          i.el-icon-loading(v-if='isSaving')
          | Create
    .mt-15
      nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CategoryEditor from '@/components/CategoryEditor.vue'

export default {
  name: 'CreateArticle',
  components: { CategoryEditor },
  data() {
    return {
      isSaving: false
    }
  },
  computed: {
    ...mapState('categories', ['category'])
  },
  created() {
    this.clearSingle()
    this.updateLoading(false)
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('categories', ['bind', 'unbind', 'saveSingle']),
    ...mapMutations('categories', ['updateSingle', 'clearSingle']),
    goBack() {
      this.$router.back()
    },
    async saveCategory() {
      this.isSaving = true
      await this.bind()
      const id = await this.saveSingle()
      await this.unbind()
      this.isSaving = false
      this.$router.replace(`/admin/categories/${id}/edit`)
    }
  }
}
</script>

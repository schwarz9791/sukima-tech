<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      p edit category - {{ categoryId }}
      el-form(v-if='!isLoading' ref='category' :model='category')
        el-form-item(label='name')
          el-input(v-model='name')
        el-form-item(label='order')
          el-input(v-model='order')
        el-form-item(label='template')
          el-input(v-model='template')
      br
      nuxt-link(to="/admin") Go admin top
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Editcategory',
  computed: {
    ...mapState('categories', ['category']),
    isLoading() {
      return !this.category
    },
    categoryId() {
      return this.$route.params.category_id
    },
    name: {
      get() {
        return this.category.name
      },
      set(value) {
        this.updateSingle({
          name: value
        })
      }
    },
    order: {
      get() {
        return this.category.order
      },
      set(value) {
        this.updateSingle({
          order: value
        })
      }
    },
    template: {
      get() {
        return this.category.template
      },
      set(value) {
        this.updateSingle({
          template: value
        })
      }
    }
  },
  created() {
    this.bindSingle(this.categoryId)
  },
  destroyed() {
    this.unbindSingle()
  },
  methods: {
    ...mapActions('categories', ['bindSingle', 'unbindSingle', 'updateSingle'])
  }
}
</script>

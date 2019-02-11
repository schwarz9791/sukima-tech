<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      h3 category list
      ul
        li(v-for="category in categories")
          nuxt-link(:to="`/admin/categories/${category._id}/edit`")
            | {{ category.name }}
      br
      nuxt-link(to="/admin") Go admin top
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoriesPage',
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState('categories', ['categories'])
  },
  created() {
    this.bind().then(() => {
      this.isLoading = false
    })
  },
  destroyed() {
    this.unbind()
  },
  methods: {
    ...mapActions('categories', ['bind', 'unbind'])
  }
}
</script>

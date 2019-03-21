<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    section
      h3 category list
      ul
        li(v-for="category in categories")
          nuxt-link(:to='`/admin/categories/${category.id}/edit`')
            | {{ category.name }}
      br
      nuxt-link(to='/admin/categories/create') Create
      br
      nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoriesPage',
  computed: {
    ...mapState('categories', ['categories']),
    isLoading() {
      return !this.categories.length
    }
  },
  created() {
    this.bind()
  },
  destroyed() {
    this.unbind()
  },
  methods: {
    ...mapActions('categories', ['bind', 'unbind'])
  }
}
</script>

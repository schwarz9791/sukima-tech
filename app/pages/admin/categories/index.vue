<template lang="pug">
  section.container
    h3 category list
    ul
      li(v-for='category in categories')
        nuxt-link(:to='`/admin/categories/${category.id}/edit`')
          | {{ category.name }}
    br
    nuxt-link(to='/admin/categories/create') Create
    br
    nuxt-link(to='/admin') Go admin top
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CategoriesPage',
  computed: {
    ...mapState('categories', ['categories']),
    isLoading() {
      return !this.categories.length
    }
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (newValue !== oldValue) this.updateLoading(newValue)
    }
  },
  created() {
    this.bind()
  },
  destroyed() {
    this.unbind()
  },
  methods: {
    ...mapActions('categories', ['bind', 'unbind']),
    ...mapMutations(['updateLoading'])
  }
}
</script>

<template lang="pug">
  section.container
    h3 category list
    ul.mt-20(v-if='categories.length')
      li(v-for='category in categories')
        nuxt-link(:to='`/admin/categories/${category.id}/edit`')
          | {{ category.name }}
    div.emptyItems(v-else)
      | No categories
    el-divider
    el-button(@click='goto("/admin")') Go admin top
    el-button(@click='goto("/admin/categories/create")') Create
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
    ...mapMutations(['updateLoading']),
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>

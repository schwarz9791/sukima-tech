<template lang="pug">
  section
    h3 category list
    div {{ data }}
    br
    nuxt-link(to="/admin/login") Go admin top
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoriesPage',
  data() {
    return {
      data: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    setTimeout(() => {
      this.data = 'hogehoge'
    }, 2000)
  }
}
</script>

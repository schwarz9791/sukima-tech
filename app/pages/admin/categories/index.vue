<template lang="pug">
  div
    h3 welcome {{ user.displayName }}
    p category list
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoriesPage',
  computed: {
    ...mapState(['user'])
  }
}
</script>

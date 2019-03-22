<template lang="pug">
  el-container
    el-main
      nuxt
      section(
        v-loading.fullscreen.lock='isLoading'
        element-loading-text='Loading...'
      )
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

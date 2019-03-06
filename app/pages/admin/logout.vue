<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLoading: true
    }
  },
  async mounted() {
    await this.logout()
    this.$router.replace('/admin')
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>

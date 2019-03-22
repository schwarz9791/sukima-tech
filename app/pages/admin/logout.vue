<template lang="pug">
  section.container
    | Logging out...
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async mounted() {
    await this.logout()
    this.$router.replace('/admin')
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>

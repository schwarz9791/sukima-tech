<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    template(v-if='!!user')
      h3 Welcome!! {{ user.displayName }}
      ul
        li
          nuxt-link(to='/admin/categories') Go to category list
        li
          nuxt-link(to='/admin/articles') Go to article list
      button(@click='logout') Sign out
    template(v-else)
      p login
      button(@click='login') Sign in with Google
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState('users', ['user'])
  },
  created() {
    const rd = this.$route.query.rd ? decodeURI(this.$route.query.rd) : null
    this.getRedirectResult(rd)
      .then(() => {
        this.isLoading = false
      })
      .catch(error => {
        console.info(error.message)
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions('auth', ['login', 'logout', 'getRedirectResult'])
  }
}
</script>

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
    ...mapState('users', ['user']),
    ...mapState('articles', ['articles']),
    ...mapState('categories', ['categories'])
  },
  async created() {
    const rd = this.$route.query.rd ? decodeURI(this.$route.query.rd) : null
    try {
      await this.getRedirectResult(rd)
      this.isLoading = false
      this.bindArticles()
      this.bindCategories()
    } catch (e) {
      console.error(e.message)
      this.isLoading = false
    }
  },
  destoryed() {
    this.unbindArticles()
    this.unbindCategories()
  },
  methods: {
    ...mapActions('auth', ['login', 'logout', 'getRedirectResult']),
    ...mapActions('articles', {
      bindArticles: 'bind',
      unbindArticles: 'unbind'
    }),
    ...mapActions('categories', {
      bindCategories: 'bind',
      unbindCategories: 'unbind'
    })
  }
}
</script>

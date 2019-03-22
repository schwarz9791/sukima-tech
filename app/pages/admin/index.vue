<template lang="pug">
  section.container
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  computed: {
    ...mapState('users', ['user']),
    ...mapState('articles', ['articles']),
    ...mapState('categories', ['categories'])
  },
  async created() {
    const rd = this.$route.query.rd ? decodeURI(this.$route.query.rd) : null
    try {
      await this.getRedirectResult(rd)
      this.updateLoading(false)
      this.bindArticles()
      this.bindCategories()
    } catch (e) {
      console.error(e.message)
      this.updateLoading(false)
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
    }),
    ...mapMutations('users', { setUser: 'user', setToken: 'token' }),
    ...mapMutations(['updateLoading'])
  }
}
</script>

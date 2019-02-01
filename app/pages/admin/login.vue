<template lang="pug">
  section(
    v-loading.fullscreen.lock='isLoading'
    element-loading-text='Loading...'
  )
    template(v-if='isLoggedIn')
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
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  GETTER_AUTH_USER,
  GETTER_IS_AUTHENTICATED,
  ACTION_SET_USER,
  ACTION_AUTH_LOGIN,
  ACTION_AUTH_LOGOUT,
  ACTION_GET_REDIRECT_RESULT
} from '@/store/types'

export default {
  name: 'LoginPage',
  asyncData() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      isLoggedIn: GETTER_IS_AUTHENTICATED
    })
  },
  mounted() {
    this.getRedurectResult()
      .then(() => {
        this.isLoading = false
      })
      .catch(error => {
        console.info(error.message)
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions({
      setUser: ACTION_SET_USER,
      authLogin: ACTION_AUTH_LOGIN,
      authLogout: ACTION_AUTH_LOGOUT,
      getRedurectResult: ACTION_GET_REDIRECT_RESULT
    }),
    login() {
      this.authLogin()
    },
    logout() {
      this.authLogout()
    }
  }
}
</script>

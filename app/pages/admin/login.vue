<template lang="pug">
  div
    template(v-if='isLoggedIn')
      p logged in
      button(@click='logout') Sign out
    template(v-else)
      p login
      button(@click='login') Sign in with Google
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  GETTER_AUTH_USER,
  GETTER_IS_AUTHENTICATED,
  ACTION_SET_USER
} from '@/store/types'

export default {
  name: 'LoginPage',
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      isLoggedIn: GETTER_IS_AUTHENTICATED
    })
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions({
      setUser: ACTION_SET_USER
    }),
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          this.$router.push('/admin/categories')
        })
        .catch(error => {
          alert(error)
        })
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>

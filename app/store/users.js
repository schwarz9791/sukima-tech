import firebase from '@/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
const usersRef = db.collection('users')

export const state = () => ({
  user: null
})

export const getters = {
  user(state) {
    return state.user
  },
  token(state) {
    return state.user && state.user.token ? state.user.token : null
  }
}

export const actions = {
  async user({ commit }, payload) {
    if (payload && payload.uid) {
      try {
        await db
          .collection('users')
          .doc(payload.uid)
          .set({
            displayName: payload.displayName,
            email: payload.email,
            emailVerified: payload.emailVerified,
            phoneNumber: payload.phoneNumber,
            photoURL: payload.photoURL
          })
        commit('user', payload)
      } catch (error) {
        console.error('Error writing document: ', error)
      }
    } else {
      commit('user', null)
    }
  },
  token({ commit }, payload) {
    commit('token', payload)
  },
  async authorizedUser({ commit, dispatch }, { result, next }) {
    try {
      const user = result.user
      if (!!user && user.uid) {
        const doc = await usersRef.doc(user.uid).get()
        if (doc.exists) {
          const token = result.credential.accessToken
          commit('user', user)
          commit('token', token)
          if (next) this.$router.push(next)
        } else {
          const users = await usersRef.get()
          if (!users.empty) {
            throw new Error('Permission denied.')
          } else {
            commit('user', user)
            dispatch('save')
          }
        }
      }
    } catch (error) {
      console.error(error.message)
    }
  },
  save: firestoreAction(async ({ state }) => {
    await usersRef.doc(state.user.uid).set({
      ...state.user,
      updated_at: serverTimestamp,
      created_at: serverTimestamp
    })
  })
}

export const mutations = {
  user(state, payload) {
    if (!!payload && payload.uid) {
      state.user = {
        uid: payload.uid,
        displayName: payload.displayName,
        email: payload.email,
        emailVerified: payload.emailVerified,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL,
        token: null
      }
    } else {
      state.user = null
    }
  },
  token(state, payload) {
    state.user.token = payload
  }
}

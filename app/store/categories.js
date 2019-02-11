import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.firestore()
const categoriesRef = db.collection('categories')

export const state = () => ({
  categories: []
})

export const getters = {
  categories(state) {
    return state.categories
  }
}

export const actions = {
  bind: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('categories', categoriesRef)
  }),
  unbind: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef('categories')
  })
}

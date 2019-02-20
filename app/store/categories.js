import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.firestore()
const categoriesRef = db.collection('categories')

export const state = () => ({
  categories: [],
  category: {}
})

export const getters = {
  categories(state) {
    return state.categories
  },
  categoryById: state => id => {
    return state.categories.find(category => category._id === id)
  }
}

export const actions = {
  bind: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('categories', categoriesRef)
  }),
  unbind: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef('categories')
  }),
  bindSingle: firebaseAction(({ bindFirebaseRef }, id) => {
    bindFirebaseRef('category', categoriesRef.doc(id))
  }),
  unbindSingle: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef('category')
  }),
  saveSingle: firebaseAction(({ state }) => {
    categoriesRef.doc(state.category._id).set(state.category)
  })
}

export const mutations = {
  updateSingle(state, payload) {
    state.category = _.merge({}, state.category, payload)
  }
}

import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.firestore()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
const categoriesRef = db.collection('categories')

export const state = () => ({
  categories: [],
  category: {
    id: null,
    deleted: false,
    created_at: null,
    updated_at: null
  }
})

export const getters = {
  categoryById: state => id => {
    return state.categories.find(category => category.id === id)
  }
}

export const actions = {
  bind: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef(
      'categories',
      categoriesRef.where('deleted', '==', false).orderBy('updated_at', 'desc')
    )
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
  saveSingle: firebaseAction(async ({ state }) => {
    let response
    if (state.category.id) {
      response = await categoriesRef.doc(state.category.id).set(state.category)
      await categoriesRef.doc(state.category.id).update({
        updated_at: serverTimestamp
      })
    } else {
      response = await categoriesRef.add(state.category)
      await categoriesRef.doc(response.id).update({
        id: response.id,
        updated_at: serverTimestamp,
        created_at: serverTimestamp
      })
    }
    return response ? response.id : null
  })
}

export const mutations = {
  updateSingle(state, payload) {
    state.category = _.merge({}, state.category, payload)
  },
  clearSingle(state) {
    state.category = {
      id: null,
      deleted: false,
      created_at: null,
      updated_at: null
    }
  }
}

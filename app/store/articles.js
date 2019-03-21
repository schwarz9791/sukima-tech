import Vue from 'vue'
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.firestore()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
const articlesRef = db.collection('articles')

export const state = () => ({
  articles: [],
  article: {
    id: null,
    deleted: false,
    created_at: null,
    updated_at: null
  }
})

export const getters = {
  articleById: state => id => {
    return state.articles.find(article => article.id === id)
  }
}

export const actions = {
  bind: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef(
      'articles',
      articlesRef.where('deleted', '==', false).orderBy('updated_at', 'desc')
    )
  }),
  unbind: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef('articles')
  }),
  bindSingle: firebaseAction(({ bindFirebaseRef }, id) => {
    bindFirebaseRef('article', articlesRef.doc(id))
  }),
  unbindSingle: firebaseAction(({ unbindFirebaseRef }) => {
    unbindFirebaseRef('article')
  }),
  saveSingle: firebaseAction(async ({ state }) => {
    let response
    if (state.article.id) {
      response = await articlesRef.doc(state.article.id).set(state.article)
      await articlesRef.doc(state.article.id).update({
        updated_at: serverTimestamp
      })
    } else {
      response = await articlesRef.add(state.article)
      await articlesRef.doc(response.id).update({
        id: response.id,
        updated_at: serverTimestamp,
        created_at: serverTimestamp
      })
    }
    return response ? response.id : null
  }),
  async uploadImage({ dispatch }, payload) {
    try {
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(`images/${payload.name}`)
      const response = await fileRef.put(payload)
      const imageUrl = await storageRef
        .child(response.ref.fullPath)
        .getDownloadURL()
      return {
        name: response.ref.name,
        url: imageUrl,
        bucket: response.ref.bucket,
        path: response.ref.fullPath
      }
    } catch (e) {
      console.error(e.message)
    }
  }
}

export const mutations = {
  updateSingle(state, payload) {
    state.article = _.merge({}, state.article, payload)
  },
  clearSingle(state) {
    state.article = {
      id: null,
      deleted: false,
      created_at: null,
      updated_at: null
    }
  },
  setImage(state, { image }) {
    Vue.set(state.article, 'image', image)
  },
  removeImage(state) {
    Vue.delete(state.article, 'image')
  }
}

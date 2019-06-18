import Vue from 'vue'
import firebase from '@/plugins/firebase'
import { firestoreAction } from 'vuexfire'
import md5 from 'js-md5'

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
  bind: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef(
      'articles',
      articlesRef.where('deleted', '==', false).orderBy('updated_at', 'desc')
    )
  }),
  unbind: firestoreAction(({ commit, unbindFirestoreRef }) => {
    unbindFirestoreRef('articles')
    commit('clear')
  }),
  bindSingle: firestoreAction(({ bindFirestoreRef }, id) => {
    bindFirestoreRef('article', articlesRef.doc(id))
  }),
  unbindSingle: firestoreAction(({ commit, unbindFirestoreRef }) => {
    unbindFirestoreRef('article')
    commit('clearSingle')
  }),
  saveSingle: firestoreAction(async ({ state }) => {
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
      const metadata = {
        customMetadata: {
          originalFilename: payload.name
        }
      }
      const filename = md5(`payload.name--${new Date().toISOString()}`)
      const fileRef = storageRef.child(`images/${filename}`)
      const response = await fileRef.put(payload, metadata)
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
  clear(state) {
    state.articles.splice(0, state.articles.length)
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

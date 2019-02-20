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
  articles(state) {
    return state.articles.filter(article => !article.deleted).sort((a, b) => {
      if (a.updated_at.toMillis() > b.updated_at.toMillis()) return 1
      if (a.updated_at.toMillis() < b.updated_at.toMillis()) return -1
      return 0
    })
  }
}

export const actions = {
  bind: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('articles', articlesRef)
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
  })
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
  }
}

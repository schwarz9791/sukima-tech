import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'
import _ from 'lodash'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export const state = () => ({
  articles: [],
  article: {}
})

export const getters = {
  articles(state) {
    return state.articles
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
  saveSingle: firebaseAction(({ state }) => {
    articlesRef.doc(state.article._id).set(state.article)
  })
}

export const mutations = {
  updateSingle(state, payload) {
    state.article = _.merge({}, state.article, payload)
  }
}

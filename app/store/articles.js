import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export const state = () => ({
  articles: []
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
  })
}

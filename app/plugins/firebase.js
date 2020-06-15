import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    databaseURL: process.env.firebaseDatabaseUrl,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderId
  })
  firebase.firestore().settings({ timestampsInSnapshots: true })
}

export default firebase

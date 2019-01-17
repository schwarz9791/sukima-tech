import firebase from '@firebase/app'
import '@firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCTB4LQ4gWeHBXADkzA89QZy8yUc7zCmFk',
    authDomain: 'stg-sukima-tech.firebaseapp.com',
    databaseURL: 'https://stg-sukima-tech.firebaseio.com',
    projectId: 'stg-sukima-tech',
    storageBucket: 'stg-sukima-tech.appspot.com',
    messagingSenderId: '206811086107'
  })
}

export default firebase

import FirebaseLocalStorageDB from '@/assets/javascripts/FirebaseLocalStorageDB'

export default async function(context) {
  try {
    const db = await FirebaseLocalStorageDB.connect()
    const firebaseData = await db.get(
      `firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`
    )
    if (firebaseData) {
      context.store.commit('users/user', firebaseData.value)
      context.store.commit(
        'users/token',
        firebaseData.value.stsTokenManager.accessToken
      )
    }
    if (context.store.getters['users/user']) return
    if (
      context.route.name !== 'admin' &&
      context.route.name !== 'admin-logout' &&
      context.route.name.includes('admin')
    ) {
      throw new Error('Please login.')
    }
  } catch (e) {
    alert(e.message)
    context.redirect(`/admin?rd=${context.route.path}`)
  }
}

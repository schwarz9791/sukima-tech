export default function({ store, route, redirect }) {
  if (
    !store.getters['users/user'] &&
    route.name !== 'admin' &&
    route.name.includes('admin')
  ) {
    alert('Please login.')
    redirect('/admin')
  }
}

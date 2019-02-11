import { firebaseMutations } from 'vuexfire'

export const state = () => ({
  app: null
})

export const mutations = {
  ...firebaseMutations
}

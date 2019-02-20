import { firebaseMutations } from 'vuexfire'
import _ from 'lodash'

export const state = () => ({
  app: null
})

export const mutations = {
  ...firebaseMutations
}

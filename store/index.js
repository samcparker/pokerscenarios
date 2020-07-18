import createPersistedState from 'vuex-persistedstate'

export const strict = false

export const state = () => ({
    counter: 0
})

export const mutations = {

  }

  export const plugins = [
    createPersistedState()
  ]
  
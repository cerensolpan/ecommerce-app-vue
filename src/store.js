import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    products: [],
    loading: false
  },
  mutations: {
    setProducts(state, data) {
      state.products = data
    },

    loadingStatus(state, newLoadingStatus) {
      state.loading = newLoadingStatus
    }
  },
  actions: {
    async getProducts({ commit }) {
      commit('loadingStatus', true)

      return axios
        .get('https://nonchalant-fang.glitch.me/listing')
        .then((response) => {
          commit('setProducts', response.data)
          commit('loadingStatus', false)
        })
        .catch((err) => console.log('err', err))
    }
  },
  getters: {
    getProducts: (state) => {
      return state.products
    }
  },
  modules: {}
})

export default store

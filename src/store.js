import axios from 'axios'
import { createStore } from 'vuex'
import { toast } from 'vue3-toastify'
import { quantityCalculator } from './utils/quantityCalculator'

const store = createStore({
  state: {
    products: [],
    cart: [],
    countInBasket: 0,
    loading: false
  },
  mutations: {
    addProduct(state, product) {
      const cartProductIndex = state.cart.findIndex((p) => p.id === product.id)
      if (cartProductIndex !== -1) {
        state.cart[cartProductIndex] = product
      } else {
        state.cart.push(product)
      }
      state.countInBasket = quantityCalculator(state.cart)
    },

    setProducts(state, data) {
      state.products = data
    },

    loadingStatus(state, newLoadingStatus) {
      state.loading = newLoadingStatus
    }
  },
  actions: {
    async addProduct({ commit, state }, product) {
      const cartProduct =
        state.cart.filter((p) => p.id == product.id).length === 0
          ? { ...product, ...{ quantity: 0 } }
          : state.cart.filter((p) => p.id == product.id)[0]
      cartProduct.quantity += 1
      await axios
        .post('https://nonchalant-fang.glitch.me/order', [
          {
            id: cartProduct.id,
            amount: cartProduct.quantity
          }
        ])
        .then(() => {
          commit('addProduct', cartProduct)
          const notify = () => {
            toast.success('Added to basket', {
              autoClose: 2000
            })
          }
          notify()
        })
        .catch((error) => {
          if (error.response.data.message === 'out of stock') {
            const notify = () => {
              toast.error('Out of stock :(', {
                autoClose: 2000
              })
            }
            notify()
          }
        })
    },

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
    },

    getCart: (state) => {
      return state.cart
    }
  },
  modules: {}
})

export default store

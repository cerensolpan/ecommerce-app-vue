import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductsPage from './HomeView.vue'
import Card from '../components/Card/index.vue'
import Loading from '../components/UI/LoadingCircle/index.vue'
import store from '@/store.js'

it('renders loading component when loading is true', () => {
  store.state.loading = true

  const wrapper = mount(ProductsPage, {
    global: {
      components: {
        Card,
        Loading
      },
      plugins: [store]
    }
  })

  const loadingElement = wrapper.findComponent(Loading)
  const productsElement = wrapper.find('.products')

  expect(loadingElement.exists()).toBe(true)
  expect(productsElement.exists()).toBe(false)
})

it('renders product cards when loading is false and products are available', () => {
  store.state.loading = false
  store.state.products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 }
  ]

  const wrapper = mount(ProductsPage, {
    global: {
      components: {
        Card,
        Loading
      },
      plugins: [store]
    }
  })

  const cardElements = wrapper.findAllComponents(Card)
  const productsElement = wrapper.find('.products__card')
  const noProductElement = wrapper.find('.no-product')

  expect(cardElements.length).toBe(store.state.products.length)
  expect(productsElement.exists()).toBe(true)
  expect(noProductElement.exists()).toBe(false)
})

it('renders "Product is not found" message when loading is false and no products are available', () => {
  store.state.loading = false
  store.state.products = []

  const wrapper = mount(ProductsPage, {
    global: {
      components: {
        Card,
        Loading
      },
      plugins: [store]
    }
  })

  const productsElement = wrapper.find('.products')
  const noProductElement = wrapper.find('.products div')

  expect(productsElement.exists()).toBe(true)
  expect(noProductElement.exists()).toBe(true)
  expect(noProductElement.text()).toBe('Product is not found')
})

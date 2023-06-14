import { expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BasketComponent from './index.vue'
import store from '../../store'

it('renders the basket with count when countInBasket is not zero', () => {
  const countInBasket = 5
  store.state.countInBasket = countInBasket

  const wrapper = mount(BasketComponent, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      },
      plugins: [store]
    }
  })

  const basketElement = wrapper.findComponent(RouterLinkStub)
  const countElement = wrapper.find('.basket__count')

  expect(basketElement.exists()).toBe(true)
  expect(countElement.exists()).toBe(true)
  expect(countElement.text()).toBe(countInBasket.toString())
})

it('renders the basket without count when countInBasket is zero', () => {
  const countInBasket = 0
  store.state.countInBasket = countInBasket

  const wrapper = mount(BasketComponent, {
    global: {
      components: {
        RouterLink: RouterLinkStub
      },
      plugins: [store]
    }
  })

  const basketElement = wrapper.findComponent(RouterLinkStub)
  const countElement = wrapper.find('.basket__count')

  expect(basketElement.exists()).toBe(true)
  expect(countElement.exists()).toBe(false)
})

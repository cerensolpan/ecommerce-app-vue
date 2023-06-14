import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutPage from './CheckoutView.vue'
import ButtonComponent from '../components/UI/Button/index.vue'
import store from '@/store.js'

it('renders the checkout view with cart items and total', () => {
  const cart = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      currency: 'TRY',
      image: 'product1.jpg',
      quantity: 2
    },
    {
      id: 2,
      name: 'Product 2',
      price: 15,
      currency: 'TRY',
      image: 'product2.jpg',
      quantity: 1
    }
  ]

  store.state.cart = cart
  store.state.countInBasket = 3

  const wrapper = mount(CheckoutPage, {
    global: {
      components: {
        ButtonComponent
      },
      plugins: [store]
    }
  })

  const cartItems = wrapper.findAll('.table__list')
  const resultElement = wrapper.find('.table__result span')
  const totalElement = wrapper.find('.table__total')
  const countInBasketElement = wrapper.find('.table__head span')
  const buttonComponent = wrapper.findComponent(ButtonComponent)

  expect(cartItems.length).toBe(cart.length)
  expect(resultElement.exists()).toBe(true)
  expect(totalElement.text()).toBe('TOTAL: 35.00 TRY')
  expect(countInBasketElement.exists()).toBe(true)
  expect(countInBasketElement.text()).toBe('(3)')
  expect(buttonComponent.exists()).toBe(true)
  expect(buttonComponent.props('text')).toBe('Place Order')
})

it('dispatches addProduct action when add button is clicked', () => {
  const product = {
    id: 1,
    name: 'Product 1',
    price: 10,
    currency: 'TRY',
    image: 'product1.jpg',
    quantity: 2
  }

  const mockDispatch = vi.fn()
  store.dispatch = mockDispatch

  const wrapper = mount(CheckoutPage, {
    global: {
      components: {
        ButtonComponent
      },
      plugins: [store]
    }
  })

  const addButton = wrapper.find('.increase')
  addButton.trigger('click')

  expect(mockDispatch).toHaveBeenCalledWith('addProduct', product)
})

it('dispatches removeProduct action when remove button is clicked', () => {
  const productId = 1

  const mockDispatch = vi.fn()
  store.dispatch = mockDispatch

  const wrapper = mount(CheckoutPage, {
    global: {
      components: {
        ButtonComponent
      },
      plugins: [store]
    }
  })

  const removeButton = wrapper.find('.table-remove_btn')
  removeButton.trigger('click')

  expect(mockDispatch).toHaveBeenCalledWith('removeProduct', productId)
})

it('dispatches decrease action when decrease button is clicked', () => {
  const productId = 1

  const mockDispatch = vi.fn()
  store.dispatch = mockDispatch

  const wrapper = mount(CheckoutPage, {
    global: {
      components: {
        ButtonComponent
      },
      plugins: [store]
    }
  })

  const decreaseButton = wrapper.find('.table__result .btn-circle:first-child')
  decreaseButton.trigger('click')

  expect(mockDispatch).toHaveBeenCalledWith('decrease', productId)
})

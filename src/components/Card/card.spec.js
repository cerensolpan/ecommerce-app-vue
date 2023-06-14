import { expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardComponent from './index.vue'
import ButtonComponent from '../UI/Button/index.vue'
import store from '@/store.js'

it('renders the card with the provided product details', () => {
  const product = {
    id: 1,
    name: 'Product Name',
    price: 10,
    currency: 'TRY',
    image: 'product_image.jpg'
  }

  const wrapper = mount(CardComponent, {
    props: {
      product
    },
    global: {
      components: {
        ButtonComponent
      },
      plugins: [store]
    }
  })

  const cardElement = wrapper.find('.card')
  const imageElement = wrapper.find('.card__img')
  const nameElement = wrapper.find('.card__body span')
  const priceElement = wrapper.find('.card__footer span')
  const buttonComponent = wrapper.findComponent(ButtonComponent)

  expect(cardElement.exists()).toBe(true)
  expect(imageElement.exists()).toBe(true)
  expect(nameElement.exists()).toBe(true)
  expect(nameElement.text()).toBe(product.name)
  expect(priceElement.exists()).toBe(true)
  expect(priceElement.text()).toBe(`${product.price} ${product.currency}`)
  expect(buttonComponent.exists()).toBe(true)
  expect(buttonComponent.props('text')).toBe('Add Basket')
})

it('dispatches addProduct action when the button is clicked', () => {
  const product = {
    id: 1,
    name: 'Product 1',
    price: 10,
    currency: 'TRY',
    image: 'product1.jpg'
  }

  const mockDispatch = vi.fn()
  store.dispatch = mockDispatch

  const wrapper = mount(CardComponent, {
    props: {
      product
    },
    global: {
      components: {
        ButtonComponent
      },
      plugins: [store]
    }
  })

  const buttonComponent = wrapper.findComponent(ButtonComponent)
  buttonComponent.trigger('click')

  expect(mockDispatch).toHaveBeenCalledWith('addProduct', product)
})

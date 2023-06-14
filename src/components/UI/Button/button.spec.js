import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import ButtonComponent from './index.vue'

it('renders the button with the provided text', () => {
  const buttonText = 'Click me'
  const wrapper = mount(ButtonComponent, {
    propsData: {
      text: buttonText
    }
  })

  const buttonElement = wrapper.find('.btn')
  expect(buttonElement.exists()).toBe(true)
  expect(buttonElement.text()).toBe(buttonText)
})

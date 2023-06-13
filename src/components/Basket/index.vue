<template>
  <RouterLink class="basket" to="/checkout">
    <div class="basket__img">
      <img src="../../assets/basketImg.png" style="width: 2.5rem" />
      <span v-if="countInBasket !== 0" class="basket__count">{{ countInBasket }}</span>
    </div>

    <span>Basket</span>
  </RouterLink>
</template>

<script>
import './style.scss'
import { computed } from 'vue'
import store from '../../store'
import { RouterLink } from 'vue-router'

export default {
  name: 'BasketComponent',

  setup() {
    return {
      countInBasket: computed(() => store.state.countInBasket),
      RouterLink
    }
  }
}
</script>

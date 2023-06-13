<template>
  <div class="table-container">
    <div>
      <table class="table">
        <thead>
          <tr>
            <div class="table__head">
              My Cart <span v-if="countInBasket !== 0">({{ countInBasket }})</span>
            </div>
          </tr>
        </thead>
        <tbody>
          <div class="table__empty" v-if="cart.length === 0">The cart is empty</div>
          <div v-else>
            <div class="table__list" v-for="product in cart" :key="product.id">
              <tr class="table__information">
                <td scope="row">
                  <img class="table__img" :src="product.image" :alt="product.id" />
                </td>
                <td class="table__detail">
                  <span>{{ product.name }}</span
                  ><span class="table__detail-price"
                    >{{ product.price * product.quantity }}{{ ' ' }}{{ product.currency }}</span
                  >
                </td>
              </tr>
              <tr class="table__result">
                <td class="input-counter">
                  <button @click="decrease(product.id)" class="btn-circle decrease">-</button>
                  <span class="table-product-quantity">{{ product.quantity }}</span>
                  <button @click="addProduct(product)" class="btn-circle increase" size="sm">
                    +
                  </button>
                </td>
                <td>
                  <span @click="removeProduct(product.id)" class="table-remove_btn">Remove</span>
                </td>
              </tr>
            </div>
          </div>
        </tbody>
        <tfoot class="table_footer">
          <div>
            <div class="table__result">
              <span class="table__total">TOTAL: {{ total }} TRY</span>
            </div>
          </div>
          <div class="table__buttons">
            <RouterLink class="basket__link btn btn-secondary" to="/">
              ◀️ Continue Shopping</RouterLink
            >
            <ButtonComponent
              @click="resetCart()"
              class="btn btn-block btn-primary card-link"
              text="Place Order"
              :disabled="cart.length<=0"
            />
          </div>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '../store.js'
import ButtonComponent from '../components/UI/Button/index.vue'
import '../assets/checkout.scss'
export default {
  name: 'checkout-view',
  components: {
    ButtonComponent
  },
  setup() {
    function addProduct(p) {
      let product = { ...p }
      store.dispatch('addProduct', product)
    }
    function removeProduct(id) {
      store.dispatch('removeProduct', id)
    }
    function decrease(id) {
      store.dispatch('decrease', id)
    }
    function resetCart() {
      store.dispatch('resetCart')
    }

    return {
      addProduct,
      removeProduct,
      decrease,
      resetCart,
      cart: computed(() => store.getters.getCart),
      products: computed(() => store.getters.getProducts),
      total: computed(() => store.getters.getTotal),
      countInBasket: computed(() => store.state.countInBasket)
    }
  }
}
</script>

<style scoped></style>

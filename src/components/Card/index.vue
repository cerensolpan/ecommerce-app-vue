<template>
  <div class="card" style="width: 18rem">
    <img class="card__img" :src="product.image" :alt="product.id" />
    <div class="card__body">
      <span>{{ product.name }}</span>
    </div>
    <div class="card__footer">
      <span>{{ product.price }} {{ product.currency }}</span>
      <ButtonComponent
        @click="addProduct(product)"
        class="btn btn-block btn-primary"
        text="Add Basket"
      />
    </div>
  </div>
</template>

<script>
import './style.scss'
import ButtonComponent from '../UI/Button/index.vue'
import store from '../../store.js'
export default {
  name: 'CardComponent',
  props: {
    product: {
      id: Number,
      name: String,
      price: Number,
      currency: String,
      image: String
    }
  },
  components: {
    ButtonComponent
  },
  setup() {
    function addProduct(p) {
      let product = { ...p }
      store.dispatch('addProduct', product)
    }
    return {
      addProduct
    }
  }
}
</script>

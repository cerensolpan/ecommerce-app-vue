<template>
  <main>
    <div v-if="loading"><Loading /></div>
    <div class="products" v-else>
      <div v-if="products.length === 0">Product is not found</div>
      <div v-else v-for="product in products" :key="product.id" class="products__card">
        <Card :product="product" />
      </div>
    </div>
  </main>
</template>

<script>
import Card from '../components/Card/index.vue'
import { computed, onMounted } from 'vue'
import store from '../store.js'
import Loading from '../components/UI/LoadingCircle/index.vue'

export default {
  name: 'products-page',
  components: {
    Card,
    Loading
  },
  setup() {
    onMounted(() => {
      store.dispatch('getProducts')
    })
    return {
      products: computed(() => store.state.products),
      loading: computed(() => store.state.loading)
    }
  }
}
</script>

<style></style>

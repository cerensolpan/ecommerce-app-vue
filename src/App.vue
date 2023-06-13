<template>
  <header>
      <nav>
        <Basket />
      </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Basket from './components/Basket/index.vue'
</script>

<style scoped>

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
}

  header {
    display: flex;
    place-items: center;
    justify-content: end;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

</style>

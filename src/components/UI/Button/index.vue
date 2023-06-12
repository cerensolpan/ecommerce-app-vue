<template>
  <button class="btn" type="button">
    {{ text }}
  </button>
</template>

<script>
import './style.scss'

export default {
  name: 'ButtonComponent',
  props: {
    text: String
  }
}
</script>

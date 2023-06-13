<template>
  <button class="btn" type="button" :disabled=disabled>
    {{ text }}
  </button>
</template>

<script>
import './style.scss'

export default {
  name: 'ButtonComponent',
  props: {
    text: String,
    disabled: Boolean,
  }
}
</script>

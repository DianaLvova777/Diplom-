<template>
  <component :is="component" :width="width" :height="height" />
</template>

<script>
export default {
  name: 'IconBase',
  props: {
    component: {
      type: String,
      required: true
    },

    width: {
      type: Number,
      default: 24
    },

    height: {
      type: Number,
      default: 24
    }
  }
}
</script>

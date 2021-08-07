<template>
  <section
    class="section display-section-container"
    :style="isFooter ? { height: '40vh', minHeight: '40vh' } : null"
    :class="sassclass">
      <slot></slot>
  </section>
</template>

<script>
export default {
    name: 'displaysection',
    props: {
        sassclass: {
            required: true,
            type: String,
        },
        isFooter: {
            required: false,
            default: false,
            type: Boolean,
        },
    },
}
</script>

<style lang="sass" scoped>
.display-section-container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    height: 100vh
    min-height: 800px
    padding: 0 10%
.primary
    background-color: $primary
    color: white
.secondary
    background-color: $secondary
    color: white
.tertiary
    background-color: $tertiary
    color: white
.highlight
    background-color: $highlight
    color: white
.white
    background-color: white
.additional
    background-color: $additional
    color: white
.high-contrast
    background-color: $high-contrast
    color: $font
.off-white
    background-color: $off-white
    color: $font
</style>
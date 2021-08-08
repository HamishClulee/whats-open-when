<template>
  <button class="button button-flat cta-button-home" :class="{ 'make-dark': isDark }" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            required: true,
            type: String,
        },
        onClick: {
            required: true,
            type: Function,
        },
        isDark: {
            required: false,
            default: false,
            type: Boolean,
        },
    },
    methods: {
        handleClick () {

            this.onClick()

        },
    },
}
</script>

<style scoped lang="sass">
.make-dark
    border: 1px solid $font !important
    color: $font !important
</style>

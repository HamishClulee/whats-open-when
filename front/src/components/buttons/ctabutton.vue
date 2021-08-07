<template>
  <button class="button button-flat cta-button-home" :class="{ 'make-dark': isDark }" @click="donow">{{ text }}</button>
</template>

<script>
export default {
    name: 'ctabutton',
    props: {
        text: {
            required: true,
            type: String,
        },
        do: {
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
        donow () {

            this.do()

        },
    },
}
</script>

<style scoped lang="sass">
.make-dark
    border: 1px solid $font !important
    color: $font !important
</style>
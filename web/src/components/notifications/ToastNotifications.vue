<template>
    <transition name="fade" mode="out-in">
        <div class="message-container" :class="bgColor" :style="hasDarkText ? { color: 'black' } : { color: 'white' }">
            {{ text }}
        </div>
    </transition>
</template>

<script>
import {
    EventBus,
    MESSAGES,
} from '../../EventBus'

export default {
    name: 'ToastNotications',
    props: {
        bgColor: {
            type: String,
            validator: (value) => {
                return ['primary', 'secondary', 'tertiary', 'highlight', 'white', 'additional', ''].indexOf(value) !== -1
            },
        },
        text: {
            required: true,
            type: String,
        },
        hasDarkText: {
            type: Boolean,
            required: true,
        },
    },
    mounted() {
        setTimeout(() => {
            EventBus.$emit(MESSAGES, { isVisible: false })
        }, 7000)
    },
}
</script>

<style scoped lang="sass">
.message-container
    position: fixed
    bottom: 20px
    left: 20px
    padding: 15px 40px
    border-radius: 3px
    border: 1px solid $light-gray
    font-family: $body-font
    font-size: 1.3em
    z-index: 6
.test
    background: yellow
.primary
    background: $primary
.secondary
    background: $secondary
.tertiary
    background: $tertiary
.highlight
    background: $highlight
.additional
    background: $additional
.white
    background: 'white'
</style>

<template>
    <transition name="fade" mode="out-in">
        <div class="message-container" :class="sass" :style="black ? { color: 'black' } : { color: 'white' }">
            {{ msg }}
        </div>
    </transition>
</template>

<script>
import { 
    EventBus,
    MESSAGES,
} from '../EventBus.ts'

export default {
    name: 'usermessages',
    props: {
        sass: {
            type: String,
            validator: (value) => {
                return ['primary', 'secondary', 'tertiary', 'highlight', 'white', ''].indexOf(value) !== -1
            },
        },
        msg: {
            required: true,
            type: String,
        },
        black: {
            type: Boolean,
            required: true,
        },
    },
    mounted() {
        setTimeout(() => {
            EventBus.$emit(MESSAGES, { is: false })
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
.primary
    background: $primary
.secondary
    background: $secondary
.tertiary
    background: $tertiary
.highlight
    background: $highlight
.white
    background: 'white'
</style>
<template>
    <div class="toggle-container-outer" @click="toggle" :class="nolabels ? 'center-toggle' : 'display-default'">

        <div class="toggle-label left" v-if="labelLeft !== ''">
            {{ labelLeft }}
        </div>

        <div class="toggle-container-inner">
            <div class="toggle-background" :class="[toggleLeft ? 'be-colored-on' : 'be-colored-off', hasgray ? 'hasgray' : 'nogray']"></div>
        </div>

        <div class="toggle-actual" :class="toggleLeft ? 'be-left' : 'be-right'"></div>

        <div class="toggle-label right" v-if="labelRight !== ''">
            {{ labelRight }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'qtoggle',
    props: {
        labelRight: {
            type: String,
            required: false,
            default: '',
        },
        labelLeft: {
            type: String,
            required: false,
            default: '',
        },
        toggleLeft: Boolean,
        name: String,
        emitparent: {
            type: Boolean,
            required: true,
        },
        hasgray: {
            required: false,
            default: false,
            type: Boolean,
        },
        nolabels: {
            required: false,
            default: false,
            type: Boolean,
        },
    },
    methods: {
        toggle() {
            if (this.emitparent) {
                this.$parent.$emit('toggle-changed', this.name)
            }
        },
    },
}
</script>

<style lang="sass" scoped>
.toggle-container-outer
    display: flex
    flex-direction: row
    cursor: pointer
.center-toggle 
    justify-content: center
    margin-right: 0
    padding-left: 20px
    @media (min-width: 0px) and (max-width: 640px) 
        padding-left: 10px
.display-default 
    margin-right: 10px
.toggle-label 
    text-transform: uppercase
    color: $font
    font-size: 0.8em
    display: flex
    align-items: center
    @media (min-width: 0px) and (max-width: 640px) 
        font-size: 0.6em
.left 
    margin-right: 10px
.right 
    margin-left: calc(-2em + 15px)
.toggle-background 
    transition: background-color 0.5s ease
    border-radius: 20px
    height: calc(20px - 2px)
    width: 40px
.be-colored-on 
    transition: background-color 0.5s ease
.be-colored-off 
    transition: background-color 0.5s ease
.be-colored-off.hasgray 
    background: $secondary
.be-colored-on.hasgray 
    background: $medium-gray
.be-colored-off.nogray 
    background: $secondary
.be-colored-on.nogray 
    background: $secondary
.toggle-container-inner 
    display: flex
    flex-direction: row
.toggle-actual 
    background: #FFF
    border-radius: 20px
    height: 20px
    width: 20px
    position: relative
    box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.3)
    top: -1px
.be-right 
    transition: right 0.3s ease
    right: 20px
.be-left 
    transition: right 0.3s ease
    right: 40px
</style>
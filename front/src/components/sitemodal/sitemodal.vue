<template>
    <div class="modal-container">
        <div class="modal-background" @click="closeModal" @keydown.esc="closeModal"></div>
        <div class="modal-card">

            <div class="modal-card-content">

                <smallscreenmodal v-if="contains === 'smallscreen'"></smallscreenmodal>

            </div>
        </div>
    </div>
</template>

<script>
import smallscreenmodal from './content/smallscreen'
import { EventBus, SITEMODAL } from '../../EventBus.ts'
export default {
    name: 'sitemodal',
    components: {
        smallscreenmodal,
    },
    props: {
        contains: {
            type: String || null,
            required: true,
        },
    },
    methods: {
        closeModal() {

            EventBus.$emit(SITEMODAL, false)
        
        },
    },
}
</script>

<style lang="sass" scoped>
.modal-card-head 
    width: 100%
    display: flex
    justify-content: flex-end
.modal-container 
    position: fixed
    overflow-y: hidden
    overflow-x: hidden
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 24
    height: 100vh
.modal-background 
    position: fixed
    overflow-y: hidden
    overflow-x: hidden
    background-color: black
    opacity: 0.90
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 25
    height: 100v
.modal-card 
    width: 90%
    z-index: 26
    background-color: white
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: 50% auto
    display: flex
    flex-direction: column
    overflow-y: hidden !important
    align-items: center
    border-radius: 20px
    @media (min-width: 0px) and (max-width: 1080px) 
        font-size: 80%
    @media (min-width: 0px) and (max-width: 680px) 
        overflow-y: scroll
.modal-card-content 
    width: 90%
.close-icon 
    cursor: pointer
    background: center / contain no-repeat url("/svg/times.svg")
    background-size: unset
    height: 50px
    width: 50px
.button 
    height: 40px
    width: 300px
    font-size: 80%
    margin-left: 10px
    text-transform: lowercase
    @media (min-width: 0px) and (max-width: 800px) 
        width: 200px
.copy-confirm 
    color: green
    height: 30px
    margin-top: 15px
    margin-bottom: 0
.modal-card-foot 
    display: flex
    flex-direction: column
    padding: 0
    align-items: center
.modal-foot-button-container 
    display: flex
    flex-direction: row
    @media (min-width: 0px) and (max-width: 800px) 
        flex-direction: column
</style>
<template>
    <nav class="create-topbar-container">
        <div class="top-bar-left">
            <div class="logo-con" @click="routehome">
                <img src="/svg/smallogo.svg" />
            </div>
        </div>

        <a
            :href="`https://${getuser.subdom}.welcomeqr.codes`"
            target="_blank"
            class="top-bar-middle"
        >
            <h6 class="h6">https://{{ getuser.subdom }}.welcomeqr.codes</h6>
        </a>

        <div class="top-bar-right">

            <button class="button link top-bar-item-container" @click="$emit('save')">
                SAVE
            </button>

            <button class="button secondary top-bar-item-container" @click="$emit('preview')">
                PREVIEW
            </button>

            <button class="button secondary top-bar-item-container" @click="$emit('publish')">
                PUBLISH
            </button>

            <div class="hamburger" v-if="!showdrawer" @click="showdrawer = true">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="big-x" v-else @click="showdrawer = false">
                <div class="line"></div>
                <div class="line"></div>
            </div>

            <rightdrawer v-if="showdrawer" @closedrawer="showdrawer = false"></rightdrawer>

        </div>

    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import rightdrawer from '../nav/rightdrawer'
export default {
    name: 'createtopbar',
    components: {
        rightdrawer,
    },
    data () {
        return {
            showdrawer: false,
        }
    },
    methods: {
        routehome () {
            this.$router.push({ name: 'home'})
        },
    },
    computed: {
        ...mapGetters(['getuser']),
    },
}
</script>

<style lang="sass" scoped>
.options
    border: none
.button
    margin: 0 10px
.h6
    color: $link
    margin-left: 20px
    font-size: 1em
    margin-bottom: 5px
.top-bar-middle
    width: 100%
.top-bar-right
    display: flex
    flex-direction: row
    align-items: center
    width: 100%
    justify-content: flex-end
.create-topbar-container
    height: 60px
    border-bottom: 1px solid $light-gray
    display: flex
    flex-direction: row
    align-items: center
    background-color: white
    z-index: 9
    position: fixed
    width: 100%
    box-shadow: 0 1px 2px rgba(0,0,0,0.24)
.top-bar-left
    display: flex
    flex-direction: row
    background-color: transparent
.logo-con
    height: 60px
    display: flex
    align-items: center
    cursor: pointer
    margin-left: 15px
    @media (min-width: 0px) and (max-width: 520px)
        height: 60px
    &:hover
        opacity: 0.8
    img
        height: 50px
        width: 120px
        @media (min-width: 0px) and (max-width: 520px)
            height: 30px
.top-bar-item-container
    width: 70px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    cursor: pointer
    &:hover
        opacity: 0.8
.hamburger
    display: flex
    flex-direction: column
    width: 50px
    height: 80px
    align-items: flex-end
    justify-content: center
    cursor: pointer
    margin-right: 20px
    .line
        height: 2px
        width: 25px
        background-color: $font
        margin-top: 4px
.big-x
    cursor: pointer
    padding: 10px
    &:hover
        opacity: 0.8
    .line
        background-color: $font
        transform: rotate(-45deg)
        transition: all 1s ease
        &:first-child
            transition: all 1s ease
            transform: rotate(45deg)
            position: relative
            top: 2px
        height: 2px
        width: 20px
// .publish
//     background: center / contain no-repeat url("/svg/cloud-up.svg")
//     background-size: unset
// .save
//     background: center / contain no-repeat url("/svg/file-check.svg")
//     background-size: unset
// .preview
//     background: center / contain no-repeat url("/svg/eye.svg")
//     background-size: unset
// .options
//     background: center / contain no-repeat url("/svg/settings.svg")
//     background-size: unset
</style>
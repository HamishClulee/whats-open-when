<template>
    <div class="navbar-con">

        <div class="navbar-left">
            <div class="logo-con" @click="$route.name !== 'home' ? routehome : null">
                <img src="/images/createmevn-logo.svg" />
            </div>
        </div>

        <div class="spacer"></div>

        <div class="navbar-right">

            <div class="text-item" :class="checkvis('home') ? 'active-route' : 'inactive-route'">
                <router-link :to="{ path: '/'}">Home</router-link>
            </div>
            <div class="text-item" :class="checkvis('authed') ? 'active-route' : 'inactive-route'">
                <router-link :to="{ path: '/authed'}">Authed</router-link>
            </div>
            <div class="text-item" :class="checkvis('login') ? 'active-route' : 'inactive-route'">
                <router-link :to="{ path: '/auth/login'}">Login</router-link>
            </div>
            <div class="text-item" :class="checkvis('signup') ? 'active-route' : 'inactive-route'">
                <router-link :to="{ path: '/auth/signup'}">Signup</router-link>
            </div>
            <div class="text-item" :class="checkvis('docs') ? 'active-route' : 'inactive-route'">
                <router-link :to="{ path: '/docs'}">Docs</router-link>
            </div>
            <div class="text-item" :class="checkvis('components') ? 'active-route' : 'inactive-route'">
                <router-link :to="{ path: '/components'}">Components</router-link>
            </div>

            <div class="account-active-indic" @click="togglecanvas" v-if="isauthed">
                <div class="avatar-icon">
                    <img src="/svg/avatar.svg" />
                </div>
                <h6 class="small-6">ACCOUNT</h6>
            </div>

            <div class="hamburger" @click="togglecanvas">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>

        <transition name="fade" mode="in-out">

            <div v-if="canvasopen" class="canvas-nav">
                <div class="canvas-text-con">
                    <div class="big-x" @click="togglecanvas">
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                    <div
                        class="canvas-item"
                        @click="togglecanvas">
                            <router-link :to="{ path: '/'}">home</router-link>
                    </div>
                    <div
                        class="canvas-item"
                        @click="togglecanvas">
                            <router-link :to="{ path: '/pricing'}">pricing</router-link>
                    </div>
                    <div
                        class="canvas-item"
                        @click="togglecanvas">
                            <router-link :to="{ path: '/app'}">{{ isauthed ? 'Your Websites' : 'Try For Free'}}</router-link>
                    </div>
                    <div
                        class="canvas-item"
                        @click="togglecanvas">
                            <router-link :to="{ path: '/auth/login'}">Login / SignUp</router-link>
                    </div>
                    <div class="account-settings" v-if="isauthed">
                        <div
                            class="canvas-item account"
                            @click="togglecanvas">
                                <div class="avatar-icon">
                                    <img width="40" src="/svg/avatar.svg" />
                                </div>
                                <router-link :to="{ path: '/account'}">Account</router-link>
                        </div>
                        <div
                            class="canvas-item account"
                            @click="togglecanvas" >
                                <button class="button" @click="logout">LOGOUT</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </transition>

    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { EventBus, MESSAGES, LOGGED_OUT } from '../../EventBus'
export default {
    name: 'navbar',
    data() {
        return {
            canvasopen: false,
            scrolledTop: true,
        }
    },
    methods: {
        togglecanvas() {
            setTimeout(() => {
                this.canvasopen = !this.canvasopen
            }, 200)
        },
        routehome() {
            this.$router.push({ path: '/'})
        },
        logout() {
            this.$QAuth.logout().then(res => {
                this.$store.commit('IS_AUTHED', res.data.user)
                EventBus.$emit(MESSAGES, LOGGED_OUT)
                if (this.$route.path !== '/') this.$router.push({ path: '/' })
            })
        },
        checkvis(item) {
            return item === this.$route.name
        },
    },
    computed: {
        ...mapGetters(['scrollY', 'isauthed']),
    },
    watch: {
        scrollY: function(val) {
            // 90px from top of window
            this.scrolledTop = val < 90
        },
    },
}
</script>
<style lang="sass" scoped>
.logout
    color: $primary
    border-color: $primary
.account-settings
    margin-top: 30px
    padding-top: 30px
    border-top: 1px solid $primary
.account-active-indic
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    margin-right: 10px
    cursor: pointer
.small-6
    font-size: 0.7em
    font-family: $heading-font
    text-transform: uppercase
    margin: 0 
.spacer
    width: 100%
a
    text-decoration: none
    border-bottom: 2px solid transparent
.canvas-nav
    z-index: 6
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    transition: all 1s ease
    background-color: white
    color: $font
    height: 100vh
    width: 100%
    overflow: hidden !important
    display: flex
    justify-content: flex-start
    flex-direction: column
    align-items: flex-end
    @media (min-width: 0px) and (max-width: 520px)
        font-size: 0.8em
    .canvas-text-con
        width: 400px
        text-align: right
        margin: 30px 20px 0 0
        a
            font-size: 3em
.active-route
    display: flex
    flex-direction: column
    &:after
        content: ''
        width: 10px
        height: 2px
        background-color: $primary
        position: relative
        top: 2px
        right: 2px
.inactive-route
    display: flex
    flex-direction: column
    &:hover
        &:after
            content: ''
            width: 10px
            height: 2px
            background-color: lighten($primary, 20)
            position: relative
            top: 2px
            right: 2px
    &:after
        content: ''
        width: 10px
        height: 2px
        background-color: white
        position: relative
        top: 2px
        right: 2px
.canvas
    &:after
        left: 320px
        top: -6px
        width: 80px
        @media (min-width: 0px) and (max-width: 520px)
            width: 50px
            left: 348px
.cta
    background-color: $highlight
    color: $font
.cta-canvas
    background-color: $highlight
    color: $font
    width: 250px
    margin-top: 15px
.navbar-con, .navbar-left, .navbar-right
    display: flex
    flex-direction: row
    background-color: transparent
    a
        color: $font
        text-transform: uppercase
.navbar-con
    position: fixed
    width: 100%
    top: 0
    z-index: 2
    opacity: 0.9
    background-color: white
    border-bottom: 1px solid lighten($font, 60)
    height: $navbar-height
.navbar-right
    align-items: center
    justify-content: flex-end
    width: 100%
    margin-right: 20px
    @media (min-width: 0px) and (max-width: 980px)
        display: none
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
    margin-left: 360px
    margin-bottom: 20px
    &:hover
        opacity: 0.8
    .line
        background-color: $font
        transform: rotate(-45deg)
        &:first-child
            transform: rotate(45deg)
            position: relative
            top: 2px
        height: 2px
        width: 35px
.logo-con
    height: 80px
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
.text-item
    padding: 0 20px
.account
    img
        position: relative
        top: 4px
        margin-right: 10px
    display: flex
    flex-direction: row
    align-items: center
    justify-content: flex-end
</style>
<template>
    <section class="drawer-container">

        <div class="drawer-section">
            <router-link class="drawer-item link" :to="{ name: 'manage' }">Manage</router-link>
        </div>

        <div class="drawer-section">
            <router-link class="drawer-item link" :to="{ name: 'account' }">Account</router-link>
            <button class="button secondary logout" @click="logout()">logout</button>
        </div>

    </section>
</template>

<script>
import { EventBus, MESSAGES, LOGGED_OUT } from '../../EventBus'

export default {
    name: 'rightdrawer',
    methods: {
        logout() {
            this.$QAuth.logout().then(res => {
                this.$store.commit('IS_AUTHED', res.data.user)
                EventBus.$emit(MESSAGES, LOGGED_OUT)
                if (this.$route.path !== '/') this.$router.push({ path: '/' })
            })
        },
    },
}
</script>

<style scoped lang="sass">
.drawer-container
    height: 100vh
    overflow-x: hidden
    width: 400px
    background-color: white
    position: absolute
    top: 63px
    bottom: 0
    right: 0
    border-left: 1px solid $light-gray
    box-shadow: 0 1px 2px rgba(0,0,0,0.24)
.drawer-section
    padding: 15px 20px
    border-bottom: 1px solid $light-gray
    display: flex
    flex-direction: column
.drawer-item
    font-size: 2em
.logout
    margin-top: 20px
</style>
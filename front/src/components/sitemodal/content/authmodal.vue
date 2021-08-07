<template>
    <div class="auth-container">
        <div class="tab-container">
            <div class="tab-member" :class="isSignup ? 'active-tab' : 'non-active-tab'" @click="isSignup = !isSignup">SIGNUP</div>
            <div class="tab-member" :class="!isSignup ? 'active-tab' : 'non-active-tab'" @click="isSignup = !isSignup">LOGIN</div>
        </div>
        <div class="content-container">
            <!-- <signup v-show="isSignup"></signup>
            <login v-show="!isSignup"></login> -->
        </div>

    </div>
</template>

<script>

export default {
    name: 'authmodal',
    props: {
        contains: {
            type: String,
            required: true,
        },
    },
    created () {

        this.isSignup = this.contains === 'signup'

    },
    data () {

        return {
            isSignup: true,
        }

    },
}
</script>

<style lang="sass" scoped>
.auth-container
    font-family: $body-font
.tab-container
    display: flex
    flex-direction: row
.tab-member
    cursor: pointer
    width: 49%
    display: flex
    align-items: center
    justify-content: center
    padding: 10px
    border-bottom: 2px solid transparent
.active-tab
    border-bottom: 2px solid $secondary
</style>
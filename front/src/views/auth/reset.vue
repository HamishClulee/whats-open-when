<template>
    <div class="auth-item-container">

        <h2 class="h2">Reset Password</h2>

        <h6 class="error-h6">{{ servermsg }}</h6>

        <qinput
            inptype="password"
            placey="Password"
            :errortxt="passerror"
            eventname="passwordinput"
            @passwordinput="validatepassword"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>

        <qinput
            inptype="password"
            placey="Confirm Password"
            :errortxt="confirmerror"
            eventname="confirminput"
            @confirminput="validateconfirm"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>

        <div class="button-container">

            <button
                :disabled="!validated"
                type="submit"
                :class="{ 'disabled' : !validated }"
                class="button submit"
                @click="submit">
                    SUBMIT
            </button>

            <p>
				Already have an account? 
                <router-link :to="{ path: '/auth/login' }">Login</router-link> or 
                <router-link :to="{ path: '/auth/signup' }">Signup</router-link>.
			</p>

        </div>

    </div>
</template>

<script>

import qinput from '../../components/forms/qinput'

import {
    EventBus,
    MESSAGES,
    LOADING,
    SERVER_AUTH_ERROR_MESSAGE,
    alreadyloggedinas,
} from '../../EventBus'

export default {
    name: 'reset',
    components: {
        qinput,
    },
    data() {
        return {
            servermsg: '',
            passerror: '',
            confirmerror: '',
            password: '',
            confirm: '',
        }
    },
    mounted() {
        EventBus.$on(SERVER_AUTH_ERROR_MESSAGE, msg => {
            this.servermsg = msg
        })
    },
    created () {
        // this.$QAuth.authenticate(false).then(res => {

        //     this.$store.commit('IS_AUTHED', res.data.user)
        //     EventBus.$emit(MESSAGES, alreadyloggedinas(res.data.user.email))

        // })
    },
    methods: {
        submit(e) {

            e.preventDefault()
            if (this.validated) this.servermsg = ''

            const params = new URLSearchParams(window.location.search)
            this.$QAuth.reset(params.get('token'), this.password, this.confirm).then(res => { this.success(res) })

        },
        validatepassword(e) {

            this.password = e
            if (this.password.length < 8) this.passerror = 'Password needs to be at least 8 characters long'
            else this.passerror = ''

        },
        validateconfirm(e) {
            this.confirm = e
            if (this.password !== this.confirm) this.confirmerror = 'Passwords don\'t match'
            else this.confirmerror = ''
        },
        success(res) {
            if (res.data.userError) {
                this.servermsg = res.data.userError
            } else {
                EventBus.$emit(MESSAGES, welcomeback(res.data.user.email))
                this.servermsg = 'Password reset successfully! You are now logged in!'
                this.$store.commit('IS_AUTHED', res.data.user)
                this.$router.push({ path: '/app/manage' })
            }
        },
    },
    computed: {
        validated() {
            return this.passerror === '' 
                && this.confirmerror === ''
                && this.password !== ''
                && this.confirm !== ''
        },
    },
}
</script>

<style lang="sass" scoped>
.error-h6
    color: $primary
    font-size: 1.1em
    font-family: $body-font
.h2
    margin-bottom: 40px
.auth-item-container
    width: 100%
    max-width: 500px
.submit
    width: 100%
    margin: 5px 0
.disabled
    border-color: $light-gray
    cursor: not-allowed
    color: $light-gray
</style>
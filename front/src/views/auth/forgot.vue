<template>
    <div class="auth-item-container">

        <h2 class="h2">Problems Loging in?</h2>

        <h6 class="error-h6">{{ servermsg }}</h6>

        <qinput
            inptype="email"
            placey="Enter your email"
            :errortxt="emailerror"
            eventname="emailinput"
            @emailinput="validateemail"
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
    emailsentto,
} from '../../EventBus'

export default {
    name: 'forgot',
    components: {
        qinput,
    },
    data() {
        return {
            emailerror: '',
            email: '',
            servermsg: '',
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
            
        //     this.$router.push({ path: '/app/manage' })

        // })
    },
    methods: {
        submit(e) {
            e.preventDefault()
            if (this.validated) {
                this.servermsg = ''
            }
            this.$QAuth.forgot(this.email).then(res => {
                this.success(res)
            })
        },
        validateemail(e) {

            const reg = /^\S+@\S+$/
            this.email = e
            if (!reg.test(this.email)) this.emailerror = 'That email address looks funny, did you type it correctly?'
            else this.emailerror = ''
            
        },
        success(res) {

            if (res.data.userError) {

                this.servermsg = res.data.userError

            } else {

                EventBus.$emit(MESSAGES, emailsentto(this.email))
                this.servermsg = 'Check your email for details on how to reset your password.'

            }
        },
    },
    computed: {
        validated() {

            return this.emailerror === '' 
                && this.email !== ''

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
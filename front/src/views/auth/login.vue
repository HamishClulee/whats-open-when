<template>
    <div class="auth-item-container">
        
        <h2 class="h2">Login</h2>

        <h6 class="error-h6">{{ servermsg }}</h6>

        <qinput
            inptype="email"
            placey="Email"
            :errortxt="emailerror"
            eventname="emailinput"
            @emailinput="validateemail"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>
        
        <qinput
            inptype="password"
            placey="Password"
            :errortxt="passerror"
            eventname="passwordinput"
            @passwordinput="validatepassword"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>

        <div class="button-container">

            <a :href="buildLink">
                <div class="google-btn" style="width: 100%;">
                    <div class="google-icon-wrapper">
                        <img class="google-icon-svg" src="/svg/google.svg"/>
                    </div>
                    <p class="btn-text"><b>Continue with Google</b></p>
                </div>
            </a>

            <button
                :disabled="!validated"
                type="submit"
                :class="{ 'disabled' : !validated }"
                class="button submit"
                @click="submit">
                    SUBMIT
            </button>

            <p>Don't have an account? <router-link :to="{ path: '/auth/signup' }">Sign Up here.</router-link></p>
            <p><router-link :to="{ path: '/auth/forgot' }">Trouble logging in?</router-link></p>

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
    NEED_TO_BE_LOGGED_IN,
    alreadyloggedinas,
    EDITOR_ERROR,
} from '../../EventBus'

import { settoken } from '../../api/token'

export default {
    name: 'login',
    components: {
        qinput,

    },
    data() {
        return {
            email: '',
            password: '',
            emailerror: '',
            passerror: '',
            servermsg: '',
            googleSignInParams: {
                client_id: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
            },
        }
    },
    mounted() {

        const params = new URLSearchParams(window.location.search)

        if (params.get('authRedirect') === 'true') {

            EventBus.$emit(MESSAGES, NEED_TO_BE_LOGGED_IN)

        }
    },
    methods: {
        submit(e) {
            e.preventDefault()
            if (this.validated) {
                this.servermsg = ''
                this.$QAuth.login(this.email, this.password).then(res => { this.success(res) }).catch(err => { this.httpError(err) })
            }
        },
        validateemail(e) {

            const reg = /^\S+@\S+$/
            this.email = e
            if (!reg.test(this.email)) this.emailerror = 'That email address looks funny, did you type it correctly?'
            else if (this.email === '') this.emailerror = ''
            else this.emailerror = ''

        },
        validatepassword(e) {

            this.password = e
            if (this.password.length < 8) this.passerror = 'Password needs to be at least 8 characters long...'
            else if (this.password === '') this.passerror = ''
            else this.passerror = ''

        },
        httpError(err) {

            this.servermsg = `Something isn't right with those login details, try again. Maybe you need to Sign Up?`
            if (err.response.status !== 403) {
                EventBus.$emit(MESSAGES, EDITOR_ERROR)
            }

        },
        success(res) {

            if (res.data.userError) {

                this.servermsg = res.data.userError

            } else {

                settoken(res.data.user.token)

                this.$store.commit('IS_AUTHED', res.data.user)

                EventBus.$emit(MESSAGES, alreadyloggedinas(res.data.user.email))

                this.$router.push({ path: '/authed' })

            }
        },
    },
    computed: {
        buildLink() {

            return process.env.NODE_ENV === 'development' ?
                'http://localhost:2900/auth/google' :
                '/auth/google'
        },
        validated() {
            return this.emailerror === '' 
                && this.passerror === '' 
                && this.email !== ''
                && this.password !== ''
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
    margin-left: -5px
.auth-item-container
    width: 100%
    max-width: 500px
.submit
    width: 100%
    margin: 5px 0
.google-btn 
    height: 42px
    background-color: white
    border-radius: 2px
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .2)
    cursor: pointer
    align-self: center
    user-select: none
    transition: all 400ms ease 0s
    justify-content: center
    display: flex
    flex-direction: row
.google-btn .google-icon-wrapper 
    position: relative
    margin-top: 1px
    margin-left: 1px
    height: 40px
    border-radius: 2px
    user-select: none
.google-btn .google-icon-svg 
    position: absolute
    margin-top: 11px
    margin-left: 11px
    width: 18px
    height: 18px
    user-select: none
.google-btn .btn-text 
    margin: 10px 14px 40px 40px
    color: $medium-gray
</style>
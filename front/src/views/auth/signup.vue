<template>
    <div class="auth-item-container">

        <h2 class="h2">Sign Up</h2>

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

            <p>Already have an account? <router-link :to="{ path: '/auth/login' }">Login here.</router-link></p>
            <p><router-link :to="{ path: '/auth/forgot' }">Trouble logging in?</router-link></p>

        </div>

    </div>
</template>

<script>
import qinput from '../../components/forms/qinput'
import { EventBus, MESSAGES, LOADING, SERVER_AUTH_ERROR_MESSAGE, welcomeback } from '../../EventBus'
import { settoken } from '../../api/token'
export default {
    name: 'signup',
    components: {
        qinput,
    },
    data() {
        return {
            emailerror: '',
            passerror: '',
            confirmerror: '',
            email: '',
            password: '',
            confirm: '',
            servermsg: '',
        }
    },
    mounted() {
        EventBus.$on(SERVER_AUTH_ERROR_MESSAGE, msg => {
            this.servermsg = msg
        })
    },
    methods: {
        submit(e) {
            e.preventDefault()
            if (this.validated) {
                this.servermsg = ''
                this.$QAuth.signup(this.email, this.password, this.confirm).then(res => {
                    if (res.data.userError) {
                        this.servermsg = res.data.userError
                    } else {
                        this.$store.commit('IS_AUTHED', res.data.user)
                        settoken(res.data.user.token)

                        EventBus.$emit(MESSAGES, welcomeback(res.data.user.email))

                        this.$router.push({ path: '/app/manage' })
                    }
                })
            }
        },
        validateemail(e) {
            const reg = /^\S+@\S+$/
            this.email = e
            if (!reg.test(this.email)) this.emailerror = 'That email address looks funny, did you type it correctly?'
            else this.emailerror = ''
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
                && this.confirmerror === ''
                && this.email !== ''
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
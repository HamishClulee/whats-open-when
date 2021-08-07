<template>
    <section class="verify-container">

        <p>Your email address is {{ verifystatus }}</p>

        <button class="button" v-if="!user.isemailverified" @click="verify">verify</button>

        <h6 class="h4">{{ servermsg }}</h6>

    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus, MESSAGES, LOADING, EMAIL_VERIFY_FAILURE } from '../../EventBus'
export default {
    name: 'verify',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            servermsg: '',
        }
    },
    methods: {
        verify() {
            const params = new URLSearchParams(window.location.search)
            this.$QAuth.requestverifyemail().then(() => {

                this.servermsg = 
                `We have sent you an email at ${this.getuser.email}, 
                please follow the instructions in the email to complete the verification process`

            }).catch(() => {
                EventBus.$emit(MESSAGES, EMAIL_VERIFY_FAILURE)
            })
        },
    },
    computed: {
        verifystatus() {
            return this.user.isemailverified ? 'verified, thank you!' : 'unverified, please click the button below to verify!'
        },
        ...mapGetters(['getuser']),
    },
}
</script>

<style lang="sass" scoped>
.h4
    font-size: 1.4em
    color: $secondary
</style>
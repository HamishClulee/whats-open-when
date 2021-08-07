<template>
    <section class="verify-email-container page-container restrict layout-col layout-center-all">
        <button class="button primary large" @click="verifyEmail">Verify Your Email</button>
    </section>
</template>

<script>
import { EMAIL_VERIFY_FAILURE, EventBus, MESSAGES } from '../../EventBus'
export default {
    name: 'verifyemail',
    data() {
        return {
            token: null,
        }
    },
    mounted() {
        this.token = new URLSearchParams(window.location.search).get('token')
    },
    methods: {
        verifyEmail() {

            this.$QAuth.verifyemailtoken(this.token).then(() => {
                this.$router.push({ name: 'account' })
            }).catch(() => {
                EventBus.$emit(MESSAGES, EMAIL_VERIFY_FAILURE)
                this.$router.push({ name: 'account' })
            })
        },
    },
}
</script>

<style lang="sass" scoped></style>
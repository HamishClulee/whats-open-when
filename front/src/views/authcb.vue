<template>
    <div></div>
</template>

<script>
import { EventBus, LOADING } from '../EventBus'
import { settoken } from '../api/token'
export default {
    name: 'authcb',
    created() {

        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (token) {
            
            settoken(token.split('~').join('.'))
            this.$router.push({ name: 'manage' })

        }
    },
}
</script>

<style>

</style>
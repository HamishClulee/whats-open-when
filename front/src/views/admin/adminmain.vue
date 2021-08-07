<template>
    <section class="admin-main-container page-container wide layout-col">
        <div class="admin-tabs-container layout-row">
            <div
                class="admin-tab-item" 
                @click="$router.push({ name: 'serverlogs' })"
                :class="$route.name === 'serverlogs' ? 'active' : 'inactive'"
            >Server Logs</div>
            <!-- <div
                class="admin-tab-item"
                @click="$router.push({ name: 'userreports' })"
                :class="$route.name === 'userreports' ? 'active' : 'inactive'"
            >Users</div> -->
        </div>

        <router-view></router-view>

    </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'adminmain',
    // created() {
    //     if (this.getuser.role !== 'ADMIN') this.$router.push({ name: 'home' }) 
    // },
    computed: {
        ...mapGetters(['getuser']),
    },
}
</script>

<style lang="sass" scoped>
.admin-tabs-container
    margin-top: 30px
    width: 100%
    height: 56px
    align-items: center
    border-bottom: 1px solid $medium-gray
.admin-tab-item
    padding: 15px 30px
    border-left: 1px solid $medium-gray
    border-right: 1px solid $medium-gray
    border-bottom: 1px solid $medium-gray
    border-radius: 5px 5px 0 0
    width: 150px
.active
    border-top: 3px solid $secondary
    cursor: not-allowed
.inactive
    border-top: 3px solid $medium-gray
    cursor: pointer
</style>
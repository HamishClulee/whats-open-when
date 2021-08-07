<template>
    <main class="auth-container page-container restrict layout-col layout-center-all">
        <section class="active-component-container layout-col layout-center-all">
            <router-view></router-view>
        </section>
    </main>
</template>

<script>
export default {
    name: 'auth',
}
</script>

<style scoped lang="sass">
.comp-switch
    display: flex
    flex-direction: row
    width: 100%
    .auth-switch
        width: 100%
.active-component-container
    width: 80%
</style>
<template>
    <div class="navbar-con">

        <div class="navbar-left">
            <div class="logo-con">
                <img src="/favicon.ico" />
            </div>
            <h6>Boilerplate</h6>
        </div>

    </div>
</template>
<script>
export default {
    name: 'Navbar',
}
</script>
<style lang="sass" scoped>
a
    text-decoration: none
    border-bottom: 2px solid transparent
.navbar-con, .navbar-left
    display: flex
    flex-direction: row
    a
        color: $font
        text-transform: uppercase
.navbar-left
    height: $navbar-height
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    margin-left: 10px
    .logo-con
        margin-right: 10px
.navbar-con
    background: $secondary
    color: $off-white
    position: fixed
    width: 100%
    top: 0
    z-index: 2
    opacity: 0.9
    border-bottom: 1px solid lighten($font, 80)
    height: $navbar-height
</style>

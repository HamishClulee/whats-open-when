<template>
    <div class="small-screen-container">
        <h4>
            Welcome QR isn't ready for mobile users yet!
        </h4>
        <h4>
            Check back soon, or switch to a device with a larger screen!
        </h4>

        <img src="/svg/smallogo.svg" />
    </div>
</template>

<script>

export default {
    name: 'smallscreen',
    mounted () {
        let body = document.querySelector('body')
        if (body) {
            body.style.overflowY = 'hidden'
        }
    },
    beforeDestroy() {
        let body = document.querySelector('body')
        if (body) {
            body.style.overflowY = ''
        }
    },
}
</script>

<style lang="sass" scoped>
.small-screen-container
    padding-top: 40px
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    text-align: center
    h4
        font-size: 1.7em
        font-family: $heading-font
        color: lighten($font, 40)
    img
        height: 50px
</style>
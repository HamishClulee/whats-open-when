<template>
    <main class="home-con page-container">

        <displaysection sassclass="white">

            <h1>Welcome to Create Mevn App</h1>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                type specimen book.
            </p>

        </displaysection>

        <displaysection id="srcoll-pop" sassclass="primary">

            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                type specimen book.
            </p>

            <h1>Check out the /admin and /account sections</h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>

        </displaysection>

        <displaysection sassclass="tertiary">
            <p>
                blah
            </p>
            <p>
                blah
            </p>
            <p>
                blah?
            </p>
            <h1 class="h1">
                Do the thing!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="high-contrast">
            <p>
                Auth is all taken care of, as well as password resets and email verification.
            </p>
            <h1 class="h1">
                Hopefully this makes life easier!
            </h1>
            <ctabutton :isDark="true" text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="secondary">
            <p>
                Auth is all taken care of, as well as password resets and email verification.
            </p>
            <h1 class="h1">
                Hopefully this makes life easier!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="highlight">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                type specimen book.
            </p>
            <p>
                Lots of words...
            </p>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="additional">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a 
                type specimen book.
            </p>
            <h1 class="h1">
                Hopefully this makes life easier!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>


        <displaysection sassclass="off-white">
            <p>
                Auth is all taken care of, as well as password resets and email verification.
            </p>
            <h1 class="h1">
                Hopefully this makes life easier!
            </h1>
            <ctabutton :isDark="true" text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>
        
    </main>
</template>

<script>
import displaysection from '../components/displaysection'
import ctabutton from '../components/buttons/ctabutton'
export default {
    name: 'home',
    components: {
        displaysection,
        ctabutton,
    },
    methods: {
        ctaroute () { this.$router.push({name: 'manage'}) },
        scrollDown() {
            const el = document.getElementById('srcoll-pop')
            el.scrollIntoView({
                alignToTop: true, behavior: 'smooth',
            })
        },
    },
}
</script>

<style lang="sass" scoped>
.icon-backer
    background: center / contain no-repeat url("/svg/arrow-circle-down.svg")
    height: 50px
    width: 50px
.landing-con
    width: 100%
    display: flex
    align-items: center
    display: flex
    text-align: left
    @media (min-width: 0px) and (max-width: 1000px)
        flex-direction: column
        align-items: flex-start
        justify-content: center
#qr-svg
    height: 300px
    @media (min-width: 0px) and (max-width: 1000px)
        height: 40vw
#text-svg
    width: 80%
    max-width: 800px
.construction-foot
    width: 100%
    position: absolute
    bottom: 0
    height: 100px
    cursor: pointer
.heading-con
    display: flex
    flex-direction: column
    text-align: left
    align-items: flex-start
    padding-left: 1em
    @media (min-width: 0px) and (max-width: 1000px)
        padding-left: 0
.home-con
    text-align: center
    width: 100%
    margin-top: 0
.main-h1
    font-size: 2.8em
    font-family: $heading-font
.h2
    font-size: 1.6em
    font-weight: lighter
p
    font-size: 1.8em
    font-family: $body-font
ul
    list-style: none
    text-align: left
    margin-left: 4em
li
    font-size: 1.4em
    font-family: $heading-font
    margin-left: -60px
    text-align: left
.tilde
    color: $primary
.hidden
    opacity: 0
.fadein
    transition: opacity 1s ease
    opacity: 1
</style>

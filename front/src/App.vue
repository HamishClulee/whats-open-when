<template>
	<section class="app-main">

		<!-- GLOBAL SPINNER -->
        <transition name="fade" mode="out-in">

            <div v-show="showGlobalSpinner" class="global-spinner-con">
                <loading></loading>
            </div>

        </transition>


		<!-- APP ACTUAL -->
        <transition-group name="fade" mode="out-in">

            <template v-show="!showGlobalSpinner">

                <sitemodal :key="1" v-if="showsitemodal" v-bind="{ contains }"></sitemodal>

                <navbar :key="2" v-if="checkroute"></navbar>

                <router-view :key="3"></router-view>

                <qrfooter :key="4" v-if="loadPushed && showfooter"></qrfooter>

            </template>
            
        </transition-group>

        <usermessages v-bind="{ msg, black, sass }" v-if="showUserMessage"></usermessages>

        <sitemodal contains="smallscreen" v-if="windowWidth < 620"></sitemodal>
        
	</section>
</template>

<script>
import navbar from './components/nav/navbar'
import qrfooter from './components/nav/qrfooter'
import usermessages from './components/usermessages'
import loading from './components/loading'
import debounce from './utils/functions'
import sitemodal from './components/sitemodal/sitemodal'
import { mapGetters, mapMutations } from 'vuex'
import { 
    EventBus,
    LOADING,
    MESSAGES,
    SITEMODAL,
    EDITOR_ERROR,
} from './EventBus.ts'
import { LOGGED_IN_WITH_GOOGLE } from './EventBus'

// useful cludge
let __proxy

export default {
    name: 'app',
    components: {
        navbar,
        qrfooter,
        sitemodal,
        loading,
        usermessages,
    },
    data () {

        return {
            showsitemodal: false,
            showGlobalSpinner: false,
            contains: null,
            loadPushed: false,
            showUserMessage: false,
            msg: '',
            sass: '',
            black: '',
        }

    },
    created() {
        // set state ui vars
        this.SET_WINDOW_SIZE()
        this.SET_SCROLL_LOCATION()
    },
    mounted () {

        // EventBus handling global loading spinner, user message pop up and site wide modals
        EventBus.$on(LOADING, is => { this.showGlobalSpinner = is })

        EventBus.$on(MESSAGES, deets => {
            this.showUserMessage = deets.is
            this.msg = deets.msg
            this.sass = deets.color
            this.black = deets.black || false
        })

        EventBus.$on(SITEMODAL, (type = null) => {
            if (type) {
                this.contains = type
                this.showsitemodal = true
            } else {
                this.showsitemodal = false
            }
        })

        // For auth failure redirects from ExpressJS
        const para = new URLSearchParams(window.location.search)
        if (para.get('redirect') === 'true') {

            EventBus.$emit(MESSAGES, NEED_TO_BE_LOGGED_IN)

            this.$router.push({ path: '/auth/login?redirect=true' })
        }

        if (para.get('googleauth') === 'true') {

            EventBus.$emit(MESSAGES, LOGGED_IN_WITH_GOOGLE)
            this.$router.push({ path: '/app/manage' })
            
        }

        // useful cludge
        __proxy = this
        window.addEventListener('resize', debounce(this.sizeChange, 500))
        window.addEventListener('scroll', debounce(this.scrollChange, 100))

        // another useful cludge to prevent the footer from flashing
        setTimeout(() => this.loadPushed = true, 1500)  

    },
    methods: {
        ...mapMutations(['SET_WINDOW_SIZE', 'SET_SCROLL_LOCATION']),
        sizeChange: () => {

            __proxy.SET_WINDOW_SIZE()
		
        },
        scrollChange: () => {

            __proxy.SET_SCROLL_LOCATION()

        },
    },
    computed: {
        checkroute() {
            return ['create', 'wapp', 'preview'].indexOf(this.$route.name) === -1
        },
        showfooter() {
            return ['auth'].indexOf(this.$route.name) === -1
        },
        ...mapGetters(['windowWidth']),
    },
}
</script>

<style lang="sass">
.app-main
    min-height: 100vh !important
.global-spinner-con
    height: 100vh
    min-height: 800px
    display: flex
    align-items: center
    justify-content: center
    width: 100%
</style>

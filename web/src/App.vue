<template>
	<main class="app-main">

        <transition name="fade" mode="out-in">

            <div v-show="showGlobalSpinner" class="global-spinner-con">
                <LoadingSpinner></LoadingSpinner>
            </div>

        </transition>

        <Navbar></Navbar>

        <ToastNotifications
            :text="toastDetails.text"
            :bgColor="toastDetails.bgColor"
            :hasDarkText="toastDetails.hasDarkText"
            v-if="showToast"
        ></ToastNotifications>

        <section class="app-content">
            <h1>Hello, World.</h1>
        </section>

	</main>
</template>

<script>
import Navbar from './components/nav/Navbar'
import ToastNotifications from './components/notifications/ToastNotifications'
import LoadingSpinner from './components/loaders/LoadingSpinner'
import {
    EventBus,
    LOADING,
    MESSAGES,
    EXAMPLE,
} from './EventBus'

export default {
    name: 'app',
    components: {
        Navbar,
        LoadingSpinner,
        ToastNotifications,
    },
    data () {

        return {
            commsOkay: false,
            showGlobalSpinner: false,
            loadPushed: false,
            showToast: false,
            toastDetails: {
                text: '',
                bgColor: '',
                hasDarkText: false,
            }
        }

    },
    mounted () {

        // EventBus handling global loading spinner, user message pop up and site wide modals
        EventBus.$on(LOADING, isVisible => { this.showGlobalSpinner = isVisible })

        EventBus.$on(MESSAGES, ({ isVisible, text, bgColor, hasDarkText }) => {
            this.showToast = isVisible
            this.toastDetails = { text, bgColor, hasDarkText }
        })

        this.$api.commsCheck().then(() => {
            EventBus.$emit(MESSAGES, EXAMPLE)
        })

    },
}
</script>

<style lang="sass">
.app-main
    min-height: 100vh
.app-content
    height: 90vh
    margin-top: $navbar-height
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
.global-spinner-con
    height: 100vh
    min-height: 800px
    display: flex
    align-items: center
    justify-content: center
    width: 100%
</style>

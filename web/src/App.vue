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

            <section class="picker-section">
                <h4>Pick a time!</h4>
                <div class="picker-container">
                    <vue-timepicker v-model="selectedTime" placeholder="Enter a time" format="hh:mm A" :minute-interval="30"></vue-timepicker>
                    <multiselect
                        deselect-label="Selected"
                        placeholder="Pick a day"
                        :options="days"
                        :searchable="false"
                        :allow-empty="false"
                        :value="selectedDay"
                        @select="daySelected"
                    />
                    <button class="button" @click="submitQuery">Whats Open?</button>
                </div>
            </section>
            <section class="picker-section">
                <h4>Whats open?</h4>
                <section><h5>{{ openAtTime.length !== 0 ? openAtTime : 'Looks like nothing is open at that time :(' }}</h5></section>
            </section>
        </section>

	</main>
</template>

<script>
import Vue2TimePicker from 'vue2-timepicker'
import Multiselect from 'vue-multiselect'
import Navbar from './components/nav/Navbar'
import ToastNotifications from './components/notifications/ToastNotifications'
import LoadingSpinner from './components/loaders/LoadingSpinner'
import {
    EventBus,
    LOADING,
    MESSAGES,
} from './EventBus'

export default {
    name: 'app',
    components: {
        Navbar,
        LoadingSpinner,
        ToastNotifications,
        'vue-timepicker': Vue2TimePicker,
        Multiselect,
    },
    data () {
        return {
            commsOkay: false,
            showGlobalSpinner: false,
            showToast: false,
            toastDetails: {
                text: '',
                bgColor: '',
                hasDarkText: false,
            },
            days: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            selectedDay: 'Monday',
            selectedTime: '01:00 pm',
            openAtTime: []
        }
    },
    mounted () {

        // EventBus handling global loading spinner, user message pop up and site wide modals
        EventBus.$on(LOADING, isVisible => { this.showGlobalSpinner = isVisible })

        EventBus.$on(MESSAGES, ({ isVisible, text, bgColor, hasDarkText }) => {
            this.showToast = isVisible
            this.toastDetails = { text, bgColor, hasDarkText }
        })

    },
    methods: {
        daySelected(day) {
            this.selectedDay = day
        },
        submitQuery() {
            this.showGlobalSpinner = true
            this.$api.getOpenRestaurantsByDayAndTime({ day: this.selectedDay, time: this.selectedTime }).then(res => {
                this.openAtTime = res.data.restaurants;
                this.showGlobalSpinner = false
            }).catch(() => {
                EventBus.$emit(MESSAGES, { isVisible: true, text: 'Something went wrong!', bgColor: 'primary', hasDarkText: false});
                this.showGlobalSpinner = false
            });
        }
    },

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
.button
    min-width: 200px
    border: 1px solid $off-white
    border-radius: 5px
    display: inline-block
    height: 50px
    padding: 10px 30px
    text-transform: uppercase
    vertical-align: middle
    -webkit-tap-highlight-color: transparent // Gets rid of tap active state
    text-decoration: none
    color: $off-white
    font-family: $heading-font
    font-weight: bolder
    background-color: $secondary
    text-align: center
    letter-spacing: .5px
    transition: background-color .2s ease-out
    cursor: pointer
    color: whites
    &:hover
        opacity: 0.9
    &:focus
        background-color: darken($secondary, 10%)
.picker-container
    display: flex
    flex-direction: row
    align-items: center
    gap: 10px
.picker-section
    width: 600px
    h4
        border-bottom: 1px solid $tertiary
        width: 100%
        padding-bottom: 10px
.multiselect
    width: 300px
.vue__time-picker
    input
        height: 2.5em !important
        border-radius: 5px
.global-spinner-con
    height: 100vh
    min-height: 800px
    display: flex
    align-items: center
    justify-content: center
    width: 100%
</style>

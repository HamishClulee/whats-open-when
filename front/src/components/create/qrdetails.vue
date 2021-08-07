<template>
    <section class="details-con">

        <h5 class="h5">We need a few details from you before we can create your trial welcome booklet and unique QR Code.</h5>

        <section class="details-form">

            <div class="form-item-control">

                <label>Enter your email</label>
                <input type="text" v-model="email" />

            </div>

            <div class="form-item-control">

                <label>Enter the name of your business</label>
                <input type="text" v-model="businessName" />

            </div>

            <div class="form-button-group">
                <button class="button primary" @click="actionDetails">LETS GET STARTED!</button>
            </div>

            <whatisthis @click.native="showDetailsModal"></whatisthis>

        </section>
    </section>
</template>

<script>
import whatisthis from '../whatisthis'
export default {
    name: 'qrdetails',
    components: {
        whatisthis,
    },
    data () {

        return {
            businessName: '',
            email: '',
        }
    
    },
    methods: {
        showDetailsModal () {


            this.$root.$emit('opensitemodal', 'details')

        },
        actionDetails () {

            this.$emit('detailsgood')
        
        },
    },
}
</script>
<style lang="sass" scoped>
.details-con
    height: 70vh
    min-height: 700px
    width: 60%
    min-width: 400px
    margin-left: auto
    margin-right: auto
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    .details-form
        width: 100%
        .form-item-control
            display: flex
            flex-direction: column
            width: 100%
            margin: 10px
            label
                text-transform: uppercase
                font-size: 10px
                font-family: $heading-font
                color: $secondary
                font-weight: bold
            input
                font-size: 1.5em
        .form-button-group
            width: 80%
            margin-left: auto
            margin-right: auto
            .button
                width: 100%
                margin-top: 20px

</style>


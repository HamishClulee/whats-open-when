<template>
    <section class="unsub-container">
        <h6 class="h6">Click here to unsubscribe from all emails from Welcome QR Codes. You can turn them back on at any time.</h6>

        <div class="loading-container" v-show="networkinprogress">
            <loadinginline :large="true"></loadinginline>
        </div>

        <template v-show="!networkinprogress">

            <p>You are currently {{ substatus }} all emails.</p>

            <div class="sub-buttons-container" v-if="!networkinprogress">

                <div
                    class="sub-button"
                    :class="issubbed ? 'active' : 'inactive'"
                    @click="subclicked('sub')"
                >SUBSCRIBED</div>

                <div
                    class="sub-button"
                    :class="issubbed ? 'inactive' : 'active'"
                    @click="subclicked('unsub')"
                >UNSUBSCRIBED</div>

            </div>

        </template>

    </section>
</template>

<script>
import loadinginline from '../../components/loadinginline'
export default {
    name: 'unsub',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    components: {
        loadinginline,
    },
    data() {
        return {
            issubbed: this.user.allowsemails,
            networkinprogress: false,
        }
    },
    methods: {
        subclicked(action) {

            if (this.issubbed === true && action === 'unsub') {
                this.dotoggle()
            }
            if (this.issubbed === false && action === 'sub') {
                this.dotoggle()
            }

        },
        dotoggle() {

            this.networkinprogress = true

            this.$QAuth.togglesubscribe(!this.issubbed).then(res => {
                
                this.issubbed = res.data.content.allow

                this.networkinprogress = false
            })
        },
    },
    computed: {
        substatus() {
            return this.issubbed ? 'subscribed to' : 'unsubscribed from' 
        },
    },
    watch: {
        user: function () {
            this.issubbed = this.user.allowsemails
        },
    },
}
</script>

<style lang="sass" scoped>
.loading-container
    display: flex
    align-items: center
    justify-content: center
    padding: 20px
.sub-buttons-container
    display: flex
    align-items: center
    justify-content: center
    flex-direction: row
.sub-button
    margin: 5px
    border-radius: 40px
    padding: 10px 15px
    cursor: pointer
.inactive
    border: 3px solid $light-gray
.active
    border: 3px solid $secondary
</style>
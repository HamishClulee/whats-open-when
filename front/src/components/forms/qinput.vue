<template>
    <div class="field-container" :style="{ 'width': fullwidth ? '100%' : 'auto'}">

        <span class="input-row">
            <input
                :style="{ 'width': setwidth }"
                @focus="touched = true"
                @blur="onBlur"
                @input="touched = true"
                class="form-input"
                placeholder=" "
                v-model="val"
                :type="localtype"
                :autocomplete="hasautocomplete"
                :required="isrequired"
            >
            <img @click="toggletype" v-if="inptype === 'password'" :src="localtype === 'password' ? '/svg/eye.svg' : '/svg/eye-slash.svg'"/>
        </span>

        <label
            @click="setInputActive"
            :class="stayactive ? 'stay-active' : 'placey-text'">
                {{ placey }}
        </label>

        <div class="error-text-con">
            <div v-if="errortxt !== ''" class="error-icon"></div>
            <p class="error-text">{{ errortxt }}</p>

        </div>

    </div>
</template>

<script>
export default {
    name: 'qinput',
    props: {
        fullwidth: {
            default: true,
            type: Boolean,
        },
        setwidth: {
            default: '100%',
            type: String,
        },
        placey: {
            type: String,
            required: true,
        },
        errortxt: {
            type: String,
            required: true,
        },
        eventname: {
            type: String,
            required: true,   
        },
        isrequired: {
            type: Boolean,
            required: false,
            default: false,
        },
        hasautocomplete: {
            type: Boolean,
            required: false,
            default: false,
        },
        inptype: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            val: '',
            touched: false,
            localtype: '',
        }
    },
    created() {
        this.localtype = this.inptype
    },
    mounted() {
        this.$nextTick(() => {
            this.$el.firstChild.firstChild.focus()
        })
    },
    methods: {
        setInputActive() {
            this.touched = true
            this.$el.firstChild.firstChild.focus()
        },
        onBlur(event) {
            this.touched = false
            if (event && this.email !== event.target.value) this.email = event.target.value
        },
        toggletype() {
            this.localtype = this.localtype === 'password' ? 'text' : 'password'
        },
    },
    computed: {
        stayactive() {
            return this.val !== '' || this.touched
        },
    },
    watch: {
        val: function (v, o) {
            if (v.length - o.length > 5) {
                this.touched = true
            }
            this.$emit(this.eventname, this.val)
        },
    },
}
</script>

<style lang="sass" scoped>
.input-row
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    img
        cursor: pointer
        padding: 7px
        &:hover
            background-color: $very-light-gray
            opacity: 0.8
.error-text-con
    display: flex
    flex-direction: row
    align-items: center
    height: 30px
    .error-text
        font-family: $body-font
        color: $tertiary
        margin: 5px 0
        letter-spacing: 1.3px
    .error-icon
        margin-right: 5px
        padding: 11px
        background: center / contain no-repeat url("/svg/error.svg")
        background-size: unset
.field-container
    position: relative
    display: flex
    flex-direction: column
    margin: 20px 0 0 0
.form-input
    font-size: 1.2em
    border-bottom: 1px solid $medium-gray
    border-top: none
    border-left: none
    border-right: none
    border-radius: 0
    font-size: 1.2em
    padding: 7px 0
    outline: none
    &:hover 
        border-bottom: 1px solid $medium-gray
        border-top: none
        border-left: none
        border-right: none
    &:focus 
        border-bottom: 1px solid $secondary
        border-top: none
        border-left: none
        border-right: none
        box-shadow: none
.stay-active
    transform: translateY(-24px)
    transition: all 0.5s ease
    color: $secondary
    font-size: 0.8em
    position: absolute
    font-family: $body-font
    top: 7px
    left: 0
    text-transform: uppercase
    color: $secondary
.placey-text
    position: absolute
    color: $light-gray
    transition: all 0.5s ease
    font-family: $heading-font
    color: $dark-gray
    cursor: text
    top: 7px
    left: 0
    transform: translateY(0)
</style>
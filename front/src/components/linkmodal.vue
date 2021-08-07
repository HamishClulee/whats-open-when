<template>
    <transition name="modal" v-if="show">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    
                    <h4 class="h4">Insert Link Details Below</h4>

                    <div class="modal-body">
                        <div class="field-container">
                            <label class="placey-text">NAME</label>
                            <input type="text" v-model="name" class="form-control" placeholder="Name">
                        </div>
                        <div class="field-container">
                            <label class="placey-text">URL</label>
                            <input type="url" v-model="url" class="form-control" placeholder="URL">
                        </div>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button @click="cancel" type="submit" class="button">Cancel</button>
                            <button @click="process" type="submit" class="button">Submit</button>
                        </slot>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: [
        'show',
    ],
    data () {

        return {
            name: '',
            url: '',
        }
    
    },
    methods: {
        process(){

            const data = {
                'name': this.name,
                'url': this.url,
            }
            this.$emit('callback', data)
            this.name = ''
            this.url = ''
            this.$emit('closemodal')

        },
        cancel () {

            this.$emit('closemodal')

        },
    },
}
</script>

<style scoped lang="sass">
.button
    width: 45%
    margin: 5px    
input 
    width: 100%
.modal-mask 
    position: fixed
    z-index: 9998
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .5)
    display: table
    transition: opacity .3s ease
.modal-wrapper 
    display: table-cell
    vertical-align: middle
.modal-container 
    width: 500px
    margin: 0px auto
    padding: 20px 30px
    background-color: #fff
    border-radius: 2px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .3s ease
.modal-body 
    margin: 20px 0
.modal-enter .modal-container,
.modal-leave-active .modal-container 
    -webkit-transform: scale(1.1)
    transform: scale(1.1)
</style>
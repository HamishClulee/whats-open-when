<template>
    <section class="server-logs-container">

        <section class="controls-container layout-row">

            <section class="category-container layout-col">
                <h6>Filter Logs By Category</h6>
                <span class="categories-actual layout-row">
                    <span 
                        class="category-item category-error"
                        :class="activeLevel === 'ERROR' ? 'active-cat' : 'inactive-cat'"
                        @click="setActiveLevel('ERROR')"
                    >ERROR</span>
                    <span 
                        class="category-item category-info" 
                        :class="activeLevel === 'INFO' ? 'active-cat' : 'inactive-cat'"
                        @click="setActiveLevel('INFO')"
                    >INFO</span>
                    <span 
                        class="category-item category-warn" 
                        :class="activeLevel === 'WARN' ? 'active-cat' : 'inactive-cat'"
                        @click="setActiveLevel('WARN')"
                    >WARNING</span>
                    <span 
                        class="category-item category-client" 
                        :class="activeLevel === 'CLIENT' ? 'active-cat' : 'inactive-cat'"
                        @click="setActiveLevel('CLIENT')"
                    >CLIENT</span>
                    <span 
                        class="category-item category-none"
                        :class="activeLevel === null ? 'active-cat' : 'inactive-cat'"
                        @click="setActiveLevel(null)"
                    >NONE</span>
                </span>
            </section>


            <section class="log-list-container layout-col">
                <h6>Get Specific Date (if none selected, todays log is shown)</h6>
                <multiselect
                    v-model="selectval"
                    :options="loglist"
                ></multiselect>
            </section>
        </section>


        <table>
            <thead>
                <tr>
                    <th>Date Time</th>
                    <th>Level</th>
                    <th>Category</th>
                    <th>Body</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody v-if="dayslog.length > 0">
                <tr 
                    v-for="(item, index) in dayslog" 
                    :key="index" 
                    :class="`item-${item.level.toLowerCase()}`"
                >
                    <template v-if="!activeLevel || activeLevel === item.level">
                        <td>{{ item.datetime }}</td>
                        <td>{{ item.level }}</td>
                        <td>{{ item.category }}</td>
                        <td>{{ item.level === 'CLIENT' ? JSON.parse(item.body) : item.body }}</td>
                        <td>{{ item.tags }}</td>
                    </template>
                </tr>
            </tbody>
            <div v-else>No Logs for that date.</div>
        </table>

    </section>
</template>

<script>
import { transform, ensureclean } from './transformlogs'
import multiselect from 'vue-multiselect'
import {
    EDITOR_ERROR,
    EventBus,
    MESSAGES,
    NEED_TO_BE_LOGGED_IN,
    LOADING,
} from '../../EventBus'

export default {
    name: 'serverlogs',
    components: {
        multiselect,
    },
    data () {
        return {
            activeLevel: 'ERROR',
            loglist: [],
            dayslog: [],
            selectval: '',
        }
    },
    mounted () {

        EventBus.$emit(LOADING, true)

        this.getLogs()

        this.$QAdmin.getalllogfilenames().then(res => {

            this.loglist = ensureclean(res.data.content)
            EventBus.$emit(LOADING, false)

        }).catch(err => this.handleHTTPError(err))
    },
    methods: {
        setActiveLevel(level) {
            this.activeLevel = level
        },
        getLogs() {
            this.dayslog = []
            this.$QAdmin.getlogbyday(this.selectval).then(res => {
                this.dayslog = transform(res.data.content)
            }).catch(err => this.handleHTTPError(err))
        },
        handleHTTPError(err) {

            EventBus.$emit(LOADING, false)

            if (err.response.status === 406) {

                EventBus.$emit(MESSAGES, NEED_TO_BE_LOGGED_IN)
                this.$router.push({ name: 'login' })

            } else if (err.response.status > 500) {

                EventBus.$emit(MESSAGES, EDITOR_ERROR)

            }
        },
    },
    watch: {
        selectval: function(ol, ne) {
            this.$nextTick(() => {
                this.getLogs()
            })
        },
    },
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<style lang="sass" scoped>
.controls-container
    margin: 20px 0
.log-list-container
    margin-left: 20px
    width: 400px
.category-item
    cursor: pointer
    border-radius: 5px
    padding: 6px 20px
    margin-right: 10px
.category-item.active-cat
    background: lighten($link, 40)
.category-item.inactive-cat
    background: white
.category-none
    border: 2px solid $font
.category-info
    border: 2px solid $secondary
.category-warn
    border: 2px solid $highlight
.category-error
    border: 2px solid $tertiary
.category-client
    border: 2px solid $link
.item-info
    border-bottom: 2px solid $secondary
.item-warn
    border-bottom: 2px solid $highlight
.item-error
    border-bottom: 2px solid $tertiary
.item-client
    border-bottom: 2px solid $link
.server-logs-container
    display: flex
    flex-direction: column
.log-item
    padding: 20px
    border-bottom: 1px solid $medium-gray
    
</style>

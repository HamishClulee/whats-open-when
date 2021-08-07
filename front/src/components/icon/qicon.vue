<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="getSize" :height="getSize" viewBox="0 0 24 24" :fill="vars[color]">
        <cloudup v-if="icon === 'cloud-up'"></cloudup>
        <eye v-if="icon === 'eye'"></eye>
        <filetick v-if="icon === 'file-tick'"></filetick>
        <cog v-if="icon === 'cog'"></cog>
    </svg>
</template>

<script>
import cloudup from './paths/cloudup'
import eye from './paths/eye'
import cog from './paths/cog'
import filetick from './paths/filetick'
import variables from '../../style/index.sass'
import { manifest } from './manifest.js'

const _sizemap = {
    small: 26,
    medium: 42,
    large: 62,
    xlarge: 78,
}

export default {
    name: 'qicon',
    components: {
        cloudup, eye, filetick, cog,
    },
    props: {
        color: {
            type: String,
            required: true,
            validator: (value) => {
                return Object.keys(variables).indexOf(value) !== -1
            },
        },
        icon: {
            type: String,
            required: true,
            validator: (value) => {
                return manifest.indexOf(value) !== -1
            },
        },
        size: {
            type: String,
            required: false,
            default: 'small',
            validator: (value) => {
                return Object.keys(_sizemap).indexOf(value) !== -1
            },
        },
    },
    data() {
        return {
            vars: variables,
            sizemap: _sizemap,
        }
    },
    computed: {
        getSize() {
            return this.sizemap[this.size]
        },
    },
}
</script>

<style>

</style>
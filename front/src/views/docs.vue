<template>
    <section class="docs-container layout-row">
        <section class="sidebar-container layout-col">

            <p>/front</p>
                <p class="indent-1">Style</p>
                <p class="indent-1">Seo</p>
                <p class="indent-1">Admin</p>
                <p class="indent-1">Auth</p>
                <p class="indent-1">Account</p>
            <p>/scripts</p>
                <p class="indent-1">dev</p>
                <p class="indent-1">install</p>
            <p>/server</p>
                <p class="indent-1">models</p>
                <p class="indent-1">endpoints</p>
                <p class="indent-1">clean</p>
                <p class="indent-1">emails</p>
            <p>/interfaces</p>
                <p class="indent-1">user</p>
                <p class="bump-end">Components</p>

        </section>

        <section class="content-container layout-col" v-html="markdown">

        </section>
    </section>
</template>

<script>
import { docs } from './docs/docs.ts'

import Prism from 'prismjs'

export default {
    name: 'docs',
    data () {
        return {
            markdown: null,
        }
    },
    created () {

        // if (this.getMDFileName()) {

        import(`./docs/test.md`)
            .then(res => {
                debugger
                this.markdown = res.default
            })
            .then(() => {
                Prism.highlightAll()
            })

        // }

    },
    methods: {
        getMDFileName() {

            try {

                return docs.filter(item => {

                    return item.linkto.params.urlname === this.$route.params.urlname

                })[0].linkto.params.mdfilename

            } catch (e) {

                this.$router.push({ name: 'notfound' })

                return false

            }

        },
    },
}
</script>

<style scoped lang="sass">
.docs-container
    width: 100%
    margin-top: 70px
    display: flex
    flex-direction: row
    min-height: 100vh
.sidebar-container
    width: $docs-sidebar-width
    height: calc(100vh - 80px)
    position: fixed
    left: 0
    top: $navbar-height
    background: $secondary
    color: $off-white
    border-right: 1px solid $medium-gray
    padding: 20px 0 0 10px
    p
        margin: 0
        font-family: monospace
.indent-1
    padding: 10px 0 10px 20px
.content-container
    margin-left: $docs-sidebar-width
    padding: 50px
.bump-end
    padding-top: 30px
    border-top: 1px solid $off-white
    width: 90%
</style>
<template>
    <section class="page-section-container">
        <h4 class="h4">{{ qtitle }}</h4>
        <div class="slot-wrapper">
            <slot></slot>
        </div>
    </section>
</template>

<script>
export default {
    name: 'pagesection',
    props: {
        qtitle: {
            type: String,
            default: '',
            required: false,
        },
    },
}
</script>

<style lang="sass" scoped>
.page-section-container
    text-align: left
    margin-bottom: 60px
.slot-wrapper
    padding: 0 10px 
.h4
    border-bottom: 1px solid $light-gray
    padding-bottom: 10px
    margin-bottom: 30px
    color: $primary
</style>
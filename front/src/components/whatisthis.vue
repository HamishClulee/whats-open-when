<template>
    <div class="what-is-con">
        <div class="info"></div>
        <span class="span">What is this?</span>
        <small class="small" @click="EventBus.$emit('OPEN_MODAL', modalname)">Tell me more about this step...</small>
    </div>
</template>

<script>
// Triggers info modal of choice
export default {
    props: {
        modalname: {
            type: String,
            required: true,
        },
    },
    name: 'whatisthis',
}
</script>

<style scoped lang="sass">
.what-is-con
    display: flex
    flex-direction: row
    margin-top: 2em
    margin-bottom: 2em
    align-items: center
    justify-content: center
    cursor: pointer
    font-family: $body-font
.info
    background: center / contain no-repeat url("/svg/info-circle.svg")
    background-size: unset
    height: 50px
    width: 50px
.small
    margin-left: 10px
.span
    color: $tertiary
</style>
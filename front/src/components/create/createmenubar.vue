<template>
    <aside class="create-sidebar-con">

        <template v-if="editor !== null">
            <span @click="$emit('bold')" class="bold" :class="isBold ? 'active-button' : 'inactive-button'"></span>

            <span @click="$emit('italic')" class="italic" :class="isItalic ? 'active-button' : 'inactive-button'"></span>

            <span @click.stop="$emit('colorpicker')" :class="showColorPicker ? 'times' : 'color'" title="Set the color of the selected text"></span>

            <span @click="$emit('linkmodal')" class="link" title="Insert and internal or external link"></span>

            <span @click="$emit('fontsize')" :class="showFontSize ? 'times' : 'fontsize'" title="Set selection to be a heading"></span>

            <span @click="$emit('list')" class="list" :class="isList ? 'active-button': 'inactive-button'" title="Make a bulleted list"></span>

            <span id="increaseListLevel" title="Indent the bulleted list"></span>

            <span @click="$emit('showimagemodal')" :class="showImageModal ? 'times' : 'image'"></span>

            <span id="undo" title="Undo last action"></span>

            <span id="redo" title="Redo the last action you undid"></span>

            <span class="remove-formatting" @click="$emit('removeallformat')"></span>
        </template>

    </aside>
</template>

<script>
export default {
    name: 'createsidebar',
    props: {
        editor: {
            validator: prop => typeof prop === 'object' || prop === null,
            required: true,
        },
        isBold: {
            type: Boolean,
            required: true,
        },
        isItalic: {
            type: Boolean,
            required: true,
        },
        isList: {
            type: Boolean,
            required: true,
        },
        showColorPicker: {
            type: Boolean,
            required: true,
        },
        showFontSize: {
            type: Boolean,
            required: true,
        },
        showImageModal: {
            type: Boolean,
            required: true,
        },
    },
    mounted () {
        this.$el.addEventListener( 'click', ( e ) => {
            let id = e.target.id,
                value
            if ( id && this.editor && this.editor[ id ] ) {
                this.editor[ id ]( value )
            }
        }, false )
    },
}
</script>

<style lang="sass" scoped>
.create-sidebar-con
    padding: 5px
    font-family: $body-font
    height: 120px
    border-top: 1px solid $light-gray
    display: flex
    align-items: center
    justify-content: center
    flex-direction: row
    position: fixed
    bottom: 0
    left: 0
    right: 0
    box-shadow: 0 1px 2px rgba(0,0,0,0.24)
    background: white
    z-index: 5
span, .span
    cursor: pointer
    height: 10px
    width: 10px
    border-radius: 5px
    box-shadow: 0px 3px 3px rgba(0,0,0,0.2)
    margin: 8px
    border: 1px solid darken(#efefef, 10)
    padding: 15px
    font-family: $body-font
.active-button
    border-top: 2px solid $secondary 
.inactive-button
    display: flex
    border-bottom: 2px solid $light-gray
.bold
    background: center / contain no-repeat url("/svg/bold.svg")
    background-size: unset
.italic
    background: center / contain no-repeat url("/svg/italic.svg")
    background-size: unset
#undo
    background: center / contain no-repeat url("/svg/undo.svg")
    background-size: unset
#redo
    background: center / contain no-repeat url("/svg/redo.svg")
    background-size: unset
.times
    background: center / contain no-repeat url("/svg/times.svg")
    background-size: unset
    border-bottom: 2px solid $secondary
.link
    background: center / contain no-repeat url("/svg/link.svg")
    background-size: unset
.list
    background: center / contain no-repeat url("/svg/list.svg")
    background-size: unset
#increaseListLevel
    background: center / contain no-repeat url("/svg/list-indent.svg")
    background-size: unset
.image
    background: center / contain no-repeat url("/svg/image.svg")
    background-size: unset
.remove-formatting
    background: center / contain no-repeat url("/svg/cancel.svg")
    background-size: unset
.color
    background: center / contain no-repeat url("/svg/palette.svg")
    background-size: unset
    border-bottom: 2px solid $light-gray
.fontsize
    background: center / contain no-repeat url("/svg/text-size.svg")
    background-size: unset
</style>
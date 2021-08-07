<template>
  <section class="generate-subdom-container">
      <ctabutton :do="getsubdom" text="generate sub dom"></ctabutton>
      <div class="display-subdom-container">{{ subdom }}</div>
  </section>
</template>

<script>
import ctabutton from '../buttons/ctabutton'
export default {
    name: 'generatesubdom',
    components: {
        ctabutton,
    },
    data() {
        return {
            subdom: '',
        }
    },
    methods: {
        getsubdom() {
            this.$QEdit.generateRandomSubDom().then(res => this.subdom = res.data.subdom)
        },
    },
}
</script>

<style scoped lang="sass">

</style>
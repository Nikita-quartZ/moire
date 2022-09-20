import baseFormField from '@/components/BaseFormField.vue'

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: {
    baseFormField
  },
  computed: {
    dataValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}

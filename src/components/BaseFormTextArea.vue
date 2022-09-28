<template>
  <BaseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>
import BaseFormField from '@/components/BaseFormField.vue'

export default {
  props: {
    title: String,
    error: String,
    placeholder: String,
    value: String
  },
  components: {
    BaseFormField
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
</script>

<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :placeholder="placeholder">
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

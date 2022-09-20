<template>
  <baseFormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :type="type" :placeholder="placeholder">
  </baseFormField>
</template>

<script>
import formFieldMixins from '@/mixins/FormFieldMixins'

export default {
  props: ['type'],
  mixins: [formFieldMixins]
}
</script>

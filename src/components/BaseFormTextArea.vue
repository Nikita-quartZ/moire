<template>
  <baseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
  </baseFormField>
</template>

<script>
import formFieldMixins from '@/mixins/FormFieldMixins'

export default {
  mixins: [formFieldMixins]
}
</script>

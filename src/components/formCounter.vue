<template>
  <div class="item__row item__row--center">
    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="(amount > 1) ? amount-- : 0">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: Number
  },
  name: 'FormCounter',
  computed: {
    amount: {
      get () {
        return this.count
      },
      set (value) {
        if (typeof value === 'string' || value < 1) {
          value = 1
        }
        this.$emit('update:count', value)
      }
    }
  }
}
</script>

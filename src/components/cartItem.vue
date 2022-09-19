<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="product.color.gallery[0].file.url" width="120" height="120" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{'backgroundColor': product.color.color.code}"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ product.id }}
    </span>

    <formCounter :count.sync="amount" />

    <b class="product__price">
      {{ product.price * product.quantity | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import formCounter from '@/components/formCounter.vue'
import numberFormat from '@/helpers/numberFormat'
import { mapActions } from 'vuex'
export default {
  props: ['product'],
  components: {
    formCounter
  },
  filters: {
    numberFormat
  },
  computed: {
    amount: {
      get () {
        return this.product.quantity
      },
      set (value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.product.id, amount: value })
      }
    }
  },
  methods: {
    ...mapActions({ deleteProduct: 'updateDeleteCartProduct' })
  }
}
</script>

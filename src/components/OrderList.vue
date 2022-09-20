<template>
    <div class="cart__block" >
      <ul class="cart__orders">
        <li class="cart__order" v-for="product in this.products.items" :key="product.product.title">
          <h3>{{ product.product.title }}</h3>
          <b>{{ product.product.price * product.quantity | numberFormat }} ₽</b>
          <span>Артикул: {{ product.product.id }}</span>
        </li>
      </ul>

      <div class="cart__total">
        <p v-if="products.delevery === 1">Доставка: <b>бесплатно</b></p>
        <p v-if="products.delevery === 2">Доставка: <b>290 ₽</b></p>
        <p v-if="products.delevery === 1">Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ products.totalPrice | numberFormat }} ₽</b></p>
        <p v-if="products.delevery === 2">Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ (products.totalPrice + 290) | numberFormat }} ₽</b></p>
      </div>

      <slot />
    </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['products'],
  filters: {
    numberFormat
  }
}
</script>

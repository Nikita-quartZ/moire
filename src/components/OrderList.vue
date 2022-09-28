<template>
    <div class="cart__block" >
      <ul class="cart__orders">
        <li class="cart__order" v-for="product in this.products.items" :key="product.product.title">
          <h3>{{ product.product.title }}</h3>
          <b>{{ product.product.price * product.quantity | NumberFormat }} ₽</b>
          <span>Артикул: {{ product.product.id }}</span>
        </li>
      </ul>

      <div class="cart__total">
        <p v-if="products.delivery === 1">Доставка: <b>бесплатно</b></p>
        <p v-else>Доставка: <b>290 ₽</b></p>
        <p v-if="products.delivery === 1">Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ products.totalPrice | NumberFormat }} ₽</b></p>
        <p v-else>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ (products.totalPrice + 290) | NumberFormat }} ₽</b></p>
      </div>

      <slot />
    </div>
</template>

<script>
import NumberFormat from '@/helpers/NumberFormat'

export default {
  props: {
    products: Object
  },
  filters: {
    NumberFormat
  }
}
</script>

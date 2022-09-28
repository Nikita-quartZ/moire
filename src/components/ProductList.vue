<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.title" :product="product" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
  components: {
    ProductItem
  },
  props: {
    products: Array
  }
}
</script>

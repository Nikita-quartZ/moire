<template>
  <li class="catalog__item">

    <router-link tag="a" :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
      <img :src="changeProduct()" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link tag="a" :to="{name: 'product'}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(color, index) in product.colors" :key="color.color.code">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="index" v-model.number="activeImage">
          <span class="colors__value" :style="{backgroundColor: color.color.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
export default {
  data () {
    return {
      activeImage: 0
    }
  },
  filters: {
    numberFormat
  },
  props: ['product'],
  methods: {
    changeProduct () {
      if (this.product.id !== 14) {
        return this.product.colors[this.activeImage].gallery[0].file.url
      } else {
        return this.product.colors[this.activeImage + 1].gallery[0].file.url
      }
    }
  }
}
</script>

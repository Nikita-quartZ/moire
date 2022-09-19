<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ this.$store.state.cartProducts.length }} {{ changeWord(this.$store.state.cartProducts.length) }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cartItem v-for="product in this.$store.state.cartProductsData" :key="product.id" :product="product"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit" v-show="$store.state.cartProductsData.length">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import changeWord from '@/helpers/changeWord'
import cartItem from '@/components/cartItem.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    cartItem
  },
  methods: {
    changeWord (number) {
      return changeWord(number)
    }
  },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice' })
  }
}
</script>

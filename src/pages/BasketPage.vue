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
          {{ this.$store.state.cartProducts.length }} {{ Pluralize(this.$store.state.cartProducts.length) }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="product in this.$store.state.cartProductsData" :key="product.id" :product="product"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit" v-show="$store.state.cartProductsData.length">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import Pluralize from '@/helpers/Pluralize'
import CartItem from '@/components/CartItem'
import { mapGetters } from 'vuex'
export default {
  components: {
    CartItem
  },
  methods: {
    Pluralize (number) {
      return Pluralize(number)
    }
  },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice' })
  }
}
</script>

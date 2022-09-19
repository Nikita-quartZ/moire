<template>
  <router-link tag="a" :to="{name: 'basket'}" class="header__cart" href="cart.html" aria-label="Корзина с товарами">
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ this.$store.state.cartProducts.length }}</span>
  </router-link>
</template>

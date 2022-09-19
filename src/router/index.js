import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '@/pages/mainPage'
import ProductCart from '@/pages/ProductCart'
import BasketPage from '@/pages/BasketPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: mainPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductCart
  },
  {
    path: '/cart-product/',
    name: 'basket',
    component: BasketPage
  }
]

const router = new VueRouter({
  routes
})

export default router

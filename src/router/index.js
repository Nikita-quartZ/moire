import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '@/pages/mainPage'
import ProductCart from '@/pages/ProductCart'
import BasketPage from '@/pages/BasketPage'
import NotFoundPage from '@/pages/NotFoundPage'
import OrderPage from '@/pages/OrderPage'
import OrderInfoPage from '@/pages/OrderInfoPage'

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
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage
  },
  {
    path: '/order/:id',
    name: 'orderInfo',
    component: OrderInfoPage
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  routes
})

export default router

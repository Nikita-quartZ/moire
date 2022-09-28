import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    cartProductsData: [],
    cartProducts: [],
    lastInfo: null,
    orderInfo: null,
    orderInfoError: null
  },
  getters: {
    cartTotalPrice (state, getters) {
      let amount = 0
      for (const product of state.cartProductsData) {
        amount += product.price * product.quantity
      }
      return amount
    }
  },
  mutations: {
    updateOrderInfo (state, orderInfo) {
      state.orderInfo = orderInfo
    },
    resetCart (state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    deleteCartProduct (state, productId) {
      state.lastInfo = state.cartProducts
      state.cartProducts = state.cartProducts.filter(item => item.id !== productId)
    },
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductsData (state, items) {
      state.cartProductsData = items
    },
    syncCartProducts (state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
          color: item.color.color,
          size: item.size,
          id: item.id
        }
      })
    }
  },
  actions: {
    loadOrderInfo (context, orderId) {
      return axios.get(API_BASE_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(responce => {
          context.commit('updateOrderInfo', responce.data)
        })
        .catch(() => {
          context.state.orderInfoError = true
        })
    },
    updateCartProductAmount (context, { productId, amount }) {
      if (amount < 1) return
      return axios.put(API_BASE_URL + '/api/baskets/products', {
        basketItemId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(responce => {
          context.commit('updateCartProductsData', responce.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    loadCart (context) {
      return axios.get(API_BASE_URL + '/api/baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(responce => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', responce.data.user.accessKey)
            context.commit('updateUserAccessKey', responce.data.user.accessKey)
          }

          context.commit('updateCartProductsData', responce.data.items)
          context.commit('syncCartProducts')
        })
    },
    addProductToCart (context, { productId, amount, color, size }) {
      return axios.post(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        colorId: color,
        sizeId: size,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(responce => {
          context.commit('updateCartProductsData', responce.data.items)
          context.commit('syncCartProducts')
        })
    },
    updateDeleteCartProduct (context, productId) {
      context.commit('deleteCartProduct', productId)
      axios.delete(API_BASE_URL + `/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        data: {
          basketItemId: String(productId)
        }
      }).catch(() => {
        context.state.commit('syncCartProducts')
      }).then(() => {
        context.state.cartProductsData = context.state.cartProducts.filter(item => item.id !== productId)
      })
    }
  }
})

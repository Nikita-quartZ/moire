<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'basket'}" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО"
              placeholder="Введите ваше полное имя" type="text" />
            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки"
              placeholder="Введите ваш адрес" type="text" />
            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон"
              placeholder="Введите ваш телефон" type="tel" />
            <BaseFormText v-model="formData.email" :error="formError.email" title="Email"
              placeholder="Введите ваш Email" type="email" />
            <BaseFormTextArea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказу"
              placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="1"
                    v-model.number="deliveryType">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="2"
                    v-model.number="deliveryType">
                  <span class="options__value">
                    Курьером <b>290 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="1" v-model.number="paymentType">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="2" v-model.number="paymentType">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <OrderList :products="orderListInfo()">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
          <div v-show="formLoading">Загрузка товаров...</div>
        </OrderList>
        <div class="cart__error form__error-block" v-show="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormTextArea from '@/components/BaseFormTextArea.vue'
import BaseFormText from '@/components/BaseFormText.vue'
import OrderList from '@/components/OrderList'
import { mapGetters } from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
export default {
  data () {
    return {
      deliveryType: 1,
      paymentType: 1,
      formData: {},
      formError: {},
      formErrorMessage: '',
      formLoading: false
    }
  },
  components: {
    BaseFormTextArea,
    BaseFormText,
    OrderList
  },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice' })
  },
  methods: {
    orderListInfo () {
      return {
        items: {
          ...this.$store.state.cartProductsData
        },
        totalPrice: this.totalPrice,
        delivery: this.deliveryType
      }
    },
    order () {
      this.formError = {}
      this.formErrorMessage = ''
      this.formLoading = true
      axios.post(API_BASE_URL + '/api/orders', {
        ...this.formData,
        deliveryTypeId: this.deliveryType,
        paymentTypeId: this.paymentType
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        }
      })
        .then(responce => {
          this.formLoading = false
          this.$store.commit('resetCart')
          this.$store.commit('updateOrderInfo', responce.data)
          this.$router.push({ name: 'orderInfo', params: { id: responce.data.id } })
        })
        .catch(error => {
          this.formLoading = false
          this.formError = error.response.data.error.request || {}
          this.formErrorMessage = error.response.data.error.message
        })
    }
  }
}
</script>

<template>
  <div>
    <main class="content container" v-if="!this.$store.state.orderInfo">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </main>
    <main class="content container" v-else>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
              Каталог
            </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="cart.html">
              Корзина
            </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Заказ оформлен <span>№ {{ this.$store.state.orderInfo.id }}</span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
              Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Получатель
                </span>
                <span class="dictionary__value">
                  {{ $store.state.orderInfo.name }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Адрес доставки
                </span>
                <span class="dictionary__value">
                  {{ $store.state.orderInfo.address }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Телефон
                </span>
                <span class="dictionary__value">
                  {{ $store.state.orderInfo.phone }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Email
                </span>
                <span class="dictionary__value">
                  {{ $store.state.orderInfo.email }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Способ оплаты
                </span>
                <span class="dictionary__value">
                  {{ $store.state.orderInfo.paymentType }}
                </span>
              </li>
            </ul>
          </div>

          <OrderList :products="orderListInfo()" />
        </form>
      </section>
    </main>
    <main class="content container" v-if="this.$store.state.orderInfoError">
      <h1>Страница не найдена</h1>
    </main>

  </div>
</template>

<script>
import OrderList from '@/components/OrderList'
export default {
  created () {
    if (this.$store.state.orderInfo) {
      if (this.$store.state.orderInfo.id === this.$route.params.id) return
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
  },
  components: {
    OrderList
  },
  methods: {
    orderListInfo () {
      return {
        items: {
          ...this.$store.state.orderInfo.basket.items
        },
        totalPrice: this.$store.state.orderInfo.totalPrice,
        delevery: this.$store.state.orderInfo.deliveryType.id
      }
    }
  }
}
</script>

<style>
.lds-ellipsis {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>

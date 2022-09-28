<template>
  <main class="content container" v-if="productLoadingFailed">Ошибка загрузки</main>
  <main class="content container" v-else-if="productLoading"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'main'}" class="breadcrumbs__link">
            {{ productsData.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productsData.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="activeImg"
            :alt="productsData.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="color in productsData.colors" :key="color.gallery[0].file.name" @click.prevent="changeActiveImg(color.gallery[0].file.url)">
            <a href="" class="pics__link " :class="{'pics__link--current': color.gallery[0].file.url === activeImg}">
              <img width="98" height="98" :src="color.gallery[0].file.url" :alt="productsData.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productsData.id }}</span>
        <h2 class="item__title">
          {{ productsData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <FormCounter :count.sync="amount"/>
            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in productsData.colors" :key="color.color.code">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.color.id" checked="" v-model.number="productColor">
                      <span class="colors__value" :style="{backgroundColor: color.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model.number="productSize">
                    <option value="0" >Размер</option>
                    <option :value="size.id" v-for="size in productsData.sizes" :key="size.title">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit" @click.prevent="addToCart">
              В корзину
            </button>
          </form>
          <div v-if="productAdded">Товар добавлен в корзину</div>
          <div v-else-if="productAddSending">Товар добавляется в корзину</div>
          <div v-else-if="productAddFail.colorId">{{ productAddFail.colorId }}</div>
          <div v-else-if="productAddFail.sizeId">{{ productAddFail.sizeId }}</div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config'
import axios from 'axios'
import FormCounter from '@/components/FormCounter'
import { mapActions } from 'vuex'

export default {
  components: {
    FormCounter
  },
  data () {
    return {
      productsData: null,
      activeImg: null,
      amount: 1,
      productColor: 0,
      productSize: 0,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      productAddFail: {}
    }
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart () {
      this.productAddFail = null
      this.productAdded = false
      this.productAddSending = true
      this.addProductToCart({ productId: Number(this.$route.params.id), amount: this.amount, color: this.productColor, size: this.productSize })
        .then(() => {
          this.productAddSending = false
          this.productAdded = true
        })
        .catch(responce => {
          this.productAddSending = false
          this.productAddFail = responce.response.data.error.request
        })
    },
    loadProducts () {
      this.productLoading = true
      this.productLoadingFailed = false
      axios.get(API_BASE_URL + `/api/products/${this.$route.params.id}`)
        .then(response => {
          this.productsData = response.data
          this.activeImg = this.productsData.colors[0].gallery[0].file.url
        })
        .catch(() => { this.productLoadingFailed = true })
        .then(() => { this.productLoading = false })
    },
    changeActiveImg (url) {
      this.activeImg = url
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>

<style>
  .form__select {
    cursor: pointer;
  }
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

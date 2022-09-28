<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info" v-if="productData">
          {{ productData.pagination.total }} {{ Pluralize(productData.pagination.total) }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <FilterBar
        :min-price.sync="minPrice"
        :max-price.sync="maxPrice"
        :color-ids.sync="colorIds"
        :material-ids.sync="materialIds"
        :season-ids.sync="seasonIds"
        :category-ids.sync="categoryIds"
      />
      <section class="catalog">
        <div class="lds-ellipsis" v-if="productsLoading"><div></div><div></div><div></div><div></div></div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузки товаров <button @click.prevent="updateAllProducts">Попробовать ещё раз</button></div>
        <ProductList :products="productData.items" v-if="productData" />
        <BasePagination v-model="page" :total="total" :per-page="limit"/>
      </section>
    </div>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config'
import axios from 'axios'
import BasePagination from '@/components/BasePagination'
import ProductList from '@/components/ProductList'
import FilterBar from '@/components/FilterBar'
import Pluralize from '@/helpers/Pluralize'

export default {
  components: {
    BasePagination,
    ProductList,
    FilterBar
  },
  data () {
    return {
      productData: null,
      page: 1,
      total: null,
      limit: 3,
      minPrice: 0,
      maxPrice: 0,
      categoryIds: 0,
      colorIds: [],
      materialIds: [],
      seasonIds: [],
      text: 'товаров',
      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  methods: {
    Pluralize (number) {
      return Pluralize(number)
    },
    updateAllProducts () {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProducts)
      this.loadProducts = setTimeout(() => {
        axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.limit,
            categoryId: this.categoryIds,
            materialIds: this.materialIds,
            seasonIds: this.seasonIds,
            colorIds: this.colorIds,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice
          }
        }).then(responce => {
          this.productData = responce.data
          this.total = responce.data.pagination.pages
        }).catch(() => (this.productsLoadingFailed = true))
          .then(() => {
            this.productsLoading = false
          })
      }, 0)
    }
  },
  created () {
    this.updateAllProducts()
  },
  watch: {
    page () {
      this.updateAllProducts()
    },
    minPrice () {
      this.updateAllProducts()
    },
    maxPrice () {
      this.updateAllProducts()
    },
    colorIds () {
      this.updateAllProducts()
    },
    categoryIds () {
      this.updateAllProducts()
    },
    materialIds () {
      this.updateAllProducts()
    },
    seasonIds () {
      this.updateAllProducts()
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

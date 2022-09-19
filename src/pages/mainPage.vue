<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info" v-if="productData">
          {{ productData.pagination.total }} {{ changeWord(productData.pagination.total) }}
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
import changeWord from '@/helpers/changeWord'

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
      text: 'товаров'
    }
  },
  methods: {
    changeWord (number) {
      return changeWord(number)
    },
    updateAllProducts () {
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

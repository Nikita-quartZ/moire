<template>
  <aside class="filter">
    <form class="filter__form form" action="#" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="priceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="priceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block" v-if="currentCategories">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="category">
            <option value="0" >Все категории</option>
            <option :value="category.id" v-for="category in currentCategories.items" :key="category.title" > {{ category.title }} </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block" v-if="currentColors">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in currentColors.items" :key='color.id'>
            <label class="colors__label">
              <input class="colors__radio sr-only" type="checkbox" name="color" :value="color.id" v-model="colors" @change="changeColors(season.id)">
              <span class="colors__value" :style="{backgroundColor: color.code}">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-if="currentMaterials">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in currentMaterials.items" :key="material.title">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id" seasons="materials">
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-if="currentSeasons">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in currentSeasons.items" :key="season.title">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.id" v-model="seasons">
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="reset" v-show="showReset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { API_BASE_URL } from '@/config'
import axios from 'axios'
export default {
  props: {
    minPrice: Number,
    maxPrice: Number,
    colorIds: Array,
    materialIds: Array,
    seasonIds: Array,
    categoryIds: Number
  },
  data () {
    return {
      priceFrom: 0,
      priceTo: 0,
      currentCategories: null,
      currentMaterials: null,
      currentSeasons: null,
      currentColors: null,
      category: 0,
      colors: [],
      materials: [],
      seasons: []
    }
  },
  computed: {
    showReset () {
      return this.priceFrom || this.priceTo || this.category || this.materials.length || this.colors.length || this.seasons.length
    }
  },
  methods: {
    loadMaterials () {
      axios.get(API_BASE_URL + '/api/materials')
        .then(response => { this.currentMaterials = response.data })
    },

    loadColors () {
      axios.get(API_BASE_URL + '/api/colors')
        .then(response => { this.currentColors = response.data })
    },

    loadCategories () {
      return axios.get(API_BASE_URL + '/api/productCategories')
        .then(response => { this.currentCategories = response.data })
    },

    loadSeasons () {
      return axios.get(API_BASE_URL + '/api/seasons')
        .then(response => { this.currentSeasons = response.data })
    },

    submit () {
      this.$emit('update:minPrice', this.priceFrom)
      this.$emit('update:maxPrice', this.priceTo)
      this.$emit('update:colorIds', this.colors)
      this.$emit('update:materialIds', this.materials)
      this.$emit('update:seasonIds', this.seasons)
      this.$emit('update:categoryIds', this.category)
    },
    reset () {
      this.priceFrom = 0
      this.priceTo = 0
      this.category = 0
      this.colors = []
      this.materials = []
      this.seasons = []
      this.$emit('update:minPrice', 0)
      this.$emit('update:maxPrice', 0)
      this.$emit('update:colorIds', 0)
      this.$emit('update:materialIds', [])
      this.$emit('update:seasonIds', [])
      this.$emit('update:categoryIds', 0)
    }
  },
  created () {
    this.loadCategories()
    this.loadMaterials()
    this.loadSeasons()
    this.loadColors()
  }
}
</script>

<style>
  .colors--black{--border-color: #222}.colors__item:not(:last-child){margin-right:4px}.colors__label{position:relative;cursor:pointer;display:block;border-radius:50%;padding:3px}.colors__value,.colors__value::before{border-radius:50%;-webkit-transition:all .2s ease;transition:all .2s ease}.colors__value{display:block;width:20px;height:20px}.colors__value::before{content:'';position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:26px;height:26px;border:1px solid transparent}.colors__label:focus .colors__value::before,.colors__label:hover .colors__value::before,.colors__radio:checked~.colors__value::before{border-color:#000}.colors__radio:focus~.colors__value::before{opacity:.7}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0,0,0,0)}
</style>

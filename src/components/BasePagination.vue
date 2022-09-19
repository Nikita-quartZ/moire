<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница"
        @click.prevent="changePage(page - 1)"
        :class="{'pagination__link--disabled': page === 1}"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="list in total " :key="list">
      <a class="pagination__link " :class="{'pagination__link--current': list === page}" @click.prevent="changePage(list)">
        {{ list }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="changePage(page + 1)"
        :class="{'pagination__link--disabled': page === total}"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate'
  },
  props: ['page', 'total', 'perPage'],
  methods: {
    changePage (page) {
      if (page <= this.total && page > 0) {
        this.$emit('paginate', page)
      }
    }
  },
  computed: {
    amountPages () {
      return Math.ceil(this.total / this.perPage)
    }
  }
}
</script>

<style>
  .pagination__item {
    cursor: pointer;
  }
</style>

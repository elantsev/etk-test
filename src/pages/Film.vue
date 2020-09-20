<template>
  <!-- <div class="film">
    <router-link append :to="filmId">
      <h5 class="film__title"><b>title:</b> {{ f.title }}</h5>
    </router-link>
    <p class="film__field"><b>director:</b> {{ f.director }}</p>
    <p class="film__field"><b>producer:</b> {{ f.producer }}</p>
    <p class="film__field"><b>release date:</b> {{ f.release_date }}</p>
    <p class="film__field"><b>opening crawl: </b> {{ f.opening_crawl }}</p>
    <p class="film__field"><b>created: </b> {{ f.created | formatDate }}</p>
    <p class="film__field"><b>edited:</b> {{ f.edited | formatDate }}</p>
  </div> -->
  <div class="film">
    <h4 class="film__header">Film</h4>
    <c-preloader v-if="loading"></c-preloader>
    <c-film v-else :film="film" type="full"></c-film>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '../utils'
import CFilm from '../components/CFilm'
import CPreloader from '../components/CPreloader'

export default {
  name: 'Film',
  components: { CFilm, CPreloader },
  computed: {
    ...mapState('films', ['loading', 'film',]),
  },
  methods: {
    ...mapActions('films', ['getFilm',])
  },
  filters: { formatDate },
  created () {
    const filmId = this.$route.params.id
    this.getFilm(filmId);
  },
}
</script>


<style lang="scss" scoped>
.film {
  &__header {
    margin: 10px 0;
  }
}
</style>
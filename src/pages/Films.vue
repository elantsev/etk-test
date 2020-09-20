<template>
  <div class="films">
    <h4 class="films__header">Films</h4>
    <div class="films__list">
      <film
        class="films__item"
        v-for="film in films"
        :key="film.url"
        :film="film"
        type="preview"
      ></film>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import film from '../components/CFilm'


export default {
  name: 'films',
  components: { film },
  computed: mapState('films', {
    films: 'films',
    loading: 'loading',
  }),
  methods: {
    ...mapActions('films', ['getFilms',])
  },
  created () {
    this.getFilms();
  },
}
</script>

<style lang="scss" scoped>
.films {
  &__header {
    margin: 10px 0;
    text-align: center;
    font-weight: bold;
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0;
    @media screen and (max-width: 1300px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 630px) {
      grid-template-columns: 1fr;
    }
  }
  &__item {
    padding: 10px;
    margin: 10px;
    border: 1px solid $primary;
  }
}
</style>
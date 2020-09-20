<template>
  <div class="film">
    <p v-if="type === 'titleOnly'" class="film__header">
      {{ film.title }}
    </p>
    <router-link v-if="type === 'preview'" append :to="filmId">
      <h5 class="film__header"><b>title:</b> {{ film.title }}</h5>
    </router-link>

    <h5 v-if="type === 'full'" class="film__header">
      <b>title:</b> {{ film.title }}
    </h5>

    <template v-if="type !== 'titleOnly'"
      ><p class="film__field"><b>director:</b> {{ film.director }}</p>
      <p class="film__field"><b>producer:</b> {{ film.producer }}</p>
      <p class="film__field"><b>release date: </b> {{ film.release_date }}</p>
      <p class="film__field"><b>opening crawl:</b> {{ film.opening_crawl }}</p>
      <p class="film__field">
        <b>created: </b> {{ film.created | formatDate }}
      </p>
      <p class="film__field"><b>edited:</b> {{ film.edited | formatDate }}</p>
    </template>

    <!-- <div v-if="type !== 'full'">
      <c-film
        v-for="film in people.films"
        :url="film"
        :key="film"
        type="titleOnly"
      ></c-film>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '../utils'

export default {
  name: 'CFilm',
  props: ['film', 'type', 'url'],
  computed: {
    ...mapState('films', {
      loading: 'loading',
      filmS: 'film',
      // filmH: state => state.filmsHash[url],
    }),
    f: function () {
      return this.film ?? this.filmS;
    },
    filmId: function () {
      return this.film?.url.replace('http://swapi.dev/api/films/', '') ?? '';
    }
  },
  filters: { formatDate },
  methods: {
    ...mapActions('films', ['getFilm']),
  },
  async created () {
    if (this.type === 'titleOnly') {
      const filmId = this.url.replace('http://swapi.dev/api/films/', '')
      await this.getFilm(filmId);
    }
  },
}
</script>


<style lang="scss" scoped>
.film {
  &__header {
    margin: 10px 0;
  }
  &__field {
    margin: 4px 0;
  }
}
</style>
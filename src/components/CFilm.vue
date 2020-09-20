<template>
  <div class="film">
    <router-link v-if="type === 'titleOnly'" :to="`/films/${filmId}/`">
      <p class="film__header">
        {{ f.title }}
      </p>
    </router-link>
    <div v-else>
      <router-link v-if="type === 'preview'" append :to="filmId">
        <h5 class="film__header"><b>title:</b> {{ f.title }}</h5>
      </router-link>

      <h5 v-if="type === 'full'" class="film__header">
        <b>title:</b> {{ f.title }}
      </h5>

      <template v-if="type !== 'titleOnly'">
        <p class="film__field"><b>director:</b> {{ f.director }}</p>
        <p class="film__field"><b>producer:</b> {{ f.producer }}</p>
        <p class="film__field"><b>release date: </b> {{ f.release_date }}</p>
        <p class="film__field"><b>opening crawl:</b> {{ f.opening_crawl }}</p>
        <p class="film__field"><b>created: </b> {{ f.created | formatDate }}</p>
        <p class="film__field"><b>edited:</b> {{ f.edited | formatDate }}</p>
      </template>

      <div v-if="type === 'full'">
        <p>Сharacters in {{ f.title }}</p>
        <c-person
          v-for="character in f.characters"
          :url="character"
          :key="character"
          type="nameOnly"
        ></c-person>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '../utils'

export default {
  name: 'CFilm',
  components: { CPerson: () => import('./CPerson.vue') },
  props: ['film', 'type', 'url'],
  computed: {
    ...mapState('films', {
      loading: 'loading',
      filmH: function (state) {
        const key = this.url || `http://swapi.dev/api/films/${this.$route.params.id}/`
        return state.filmsHash?.[key]
      },
    }),
    f: function () {
      return this.film ?? this.filmH ?? {};
    },
    filmId: function () {
      return this.f?.url?.replace('http://swapi.dev/api/films/', '')?.replace('/', '') ?? '';
    }
  },
  filters: { formatDate },
  methods: { ...mapActions('films', ['getFilm']) },
  created () {
    if (this.type === 'titleOnly') {
      const filmId = this.url?.replace('http://swapi.dev/api/films/', '')?.replace('/', '')
      this.getFilm(filmId);
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
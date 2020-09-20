<template>
  <div class="person">
    <router-link v-if="type === 'nameOnly'" :to="`/people/${personId}/`">
      <p class="person__header">
        {{ p.name }}
      </p>
    </router-link>
    <router-link v-if="type === 'preview'" append :to="personId">
      <h5 class="person__header"><b>name:</b> {{ p.name }}</h5>
    </router-link>

    <h5 v-if="type === 'full'" class="person__header">
      <b>name:</b> {{ p.name }}
    </h5>

    <template v-if="type !== 'nameOnly'">
      <p class="person__field"><b>gender:</b> {{ p.gender }}</p>
      <p class="person__field"><b>mass:</b> {{ p.mass }}</p>
      <p class="person__field"><b>birth year: </b> {{ p.birth_year }}</p>
      <p class="person__field"><b>height:</b> {{ p.height }}</p>
      <p class="person__field"><b>eye color:</b> {{ p.eye_color }}</p>
      <p class="person__field"><b>created: </b> {{ p.created | formatDate }}</p>
      <p class="person__field"><b>edited:</b> {{ p.edited | formatDate }}</p>
    </template>

    <div v-if="type === 'full'">
      <p>Films with {{ p.name }}:</p>
      <c-film
        v-for="film in p.films"
        :url="film"
        :key="film"
        type="titleOnly"
      ></c-film>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { formatDate } from '../utils'

export default {
  name: 'CPerson',
  components: { CFilm: () => import('./CFilm.vue') },
  props: ['person', 'type', 'url'],
  computed: {
    ...mapState('people', {
      personH: function (state) {
        const key = this.url || `http://swapi.dev/api/people/${this.$route.params.id}/`
        return state.personHash?.[key]
      },
    }),
    p: function () {
      return this.person ?? this.personH ?? {};
    },
    personId: function () {
      return this.p?.url?.replace('http://swapi.dev/api/people/', '')?.replace('/', '');
    }
  },
  filters: { formatDate },
  methods: { ...mapActions('people', ['getPerson',]), },
  created () {
    if (this.type === 'nameOnly') {
      const personId = this.url?.replace('http://swapi.dev/api/people/', '')?.replace('/', '')
      this.getPerson(personId);
    }

  },
}
</script>


<style lang="scss" scoped>
.person {
  &__header {
    margin: 10px 0;
  }
  &__field {
    margin: 4px 0;
  }
}
</style>
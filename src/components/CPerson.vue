<template>
  <div class="person">
    <p v-if="type === 'nameOnly'" class="person__header">
      {{ person.name }}
    </p>
    <router-link v-if="type === 'preview'" append :to="personId">
      <h5 class="person__header"><b>name:</b> {{ person.name }}</h5>
    </router-link>

    <h5 v-if="type === 'full'" class="person__header">
      <b>name:</b> {{ person.name }}
    </h5>

    <template v-if="type !== 'nameOnly'"
      ><p class="person__field"><b>gender:</b> {{ person.gender }}</p>
      <p class="person__field"><b>mass:</b> {{ person.mass }}</p>
      <p class="person__field"><b>birth year: </b> {{ person.birth_year }}</p>
      <p class="person__field"><b>height:</b> {{ person.height }}</p>
      <p class="person__field"><b>eye color:</b> {{ person.eye_color }}</p>
      <p class="person__field">
        <b>created: </b> {{ person.created | formatDate }}
      </p>
      <p class="person__field">
        <b>edited:</b> {{ person.edited | formatDate }}
      </p>
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
  name: 'CPerson',
  props: ['person', 'type', 'url'],
  computed: {
    ...mapState('people', {
      loading: 'loading',
      personS: 'person',
      // personH: state => state.personHash[url],
    }),
    p: function () {
      return this.person ?? this.personS;
    },
    personId: function () {
      return this.person?.url.replace('http://swapi.dev/api/people/', '') ?? '';
    }
  },
  filters: { formatDate },
  methods: {
    ...mapActions('people', ['getPerson',]),
  },
  async created () {
    if (this.type === 'nameOnly') {
      const personId = this.url.replace('http://swapi.dev/api/people/', '')
      await this.getPerson(personId);
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
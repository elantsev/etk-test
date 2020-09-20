<template>
  <div class="people">
    <h4 class="people__header">People</h4>
    <div class="people__list">
      <c-person
        class="people__item"
        v-for="person in people"
        :key="person.url"
        :person="person"
        type="preview"
      ></c-person>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CPerson from '../components/CPerson'


export default {
  components: { CPerson },
  name: 'People',
  computed: mapState('people', {
    people: 'people',
    loading: 'loading',
  }),
  methods: {
    ...mapActions('people', ['getPeople',])
  },
  created () {
    this.getPeople();
  },
}
</script>

<style lang="scss" scoped>
.people {
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
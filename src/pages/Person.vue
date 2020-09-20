<template>
  <div class="person">
    <h4 class="person__header">Person</h4>
    <c-preloader v-if="loading"></c-preloader>
    <c-person v-else :person="personS" type="full"></c-person>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CPerson from '../components/CPerson'
import CPreloader from '../components/CPreloader'

export default {
  name: 'Person',
  components: { CPerson, CPreloader },
  computed: {
    ...mapState('people', {
      loading: 'loading',
      personS: 'person',
    }),
  },
  methods: {
    ...mapActions('people', ['getPerson',])
  },
  created () {
    const personId = this.$route.params.id
    this.getPerson(personId);
  },
}
</script>


<style lang="scss" scoped>
.person {
  &__header {
    margin: 10px 0;
  }
}
</style>
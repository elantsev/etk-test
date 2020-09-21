<template>
  <div class="people">
    <h4 class="people__header">{{ $t("people.header") }}</h4>
    <q-input
      color="white"
      bg-color="light-blue"
      filled
      v-model="searchStr"
      @keyup.enter="onEnter"
      label="Search by name"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="people__list">
      <c-person
        class="people__item"
        v-for="person in people"
        :key="person.url"
        :person="person"
        type="preview"
      ></c-person>
    </div>
    <div class="pagination">
      <router-link
        class="pagination__link"
        v-for="n in pages"
        :to="`/people/${linkGen(n, search)}`"
        :key="n"
        >{{ n }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CPerson from '../components/CPerson'


export default {
  components: { CPerson },
  name: 'People',
  data: function () {
    return {
      searchStr: ''
    }
  },
  computed: {
    ...mapState('people', {
      people: 'people',
      loading: 'loading',
      pages: state => Math.ceil(state.count / 10),
    }
    ),
    query () {
      return this.$route.query
    },
    page () {
      return this.$route.query.page || 1
    },
    search () {
      return this.$route.query.search
    },

  },
  methods: {
    ...mapActions('people', ['getPeople',]),
    linkGen (page, search) {
      if (!page && !search) return ''
      if (!page) return `?search=${search}`
      if (!search) return `?page=${page}`;
      return `?page=${page}&search=${search}`;
    },
    onEnter () {
      this.$router.push(`${this.linkGen(0, this.searchStr)}`)
    },
  },
  watch: {
    query () {
      this.getPeople(this.linkGen(this.page, this.search))
    }
  },
  created () {
    this.getPeople(this.linkGen(this.page, this.search));
    this.searchStr = this.search
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
  &__pagination {
    display: flex;
    justify-content: center;
  }
  .router-link-exact-active {
    background: $primary;
    color: #fff;
  }
  .pagination {
    display: flex;
    justify-content: center;
    &__link {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s;
      &:hover,
      .router-link-exact-active {
        background: $primary;
        color: #fff;
      }
    }
  }
}
</style>
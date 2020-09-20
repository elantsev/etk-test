<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>{{ $t("mainLayout.title") }}</q-toolbar-title>

        <q-select
          v-model="lang"
          :options="langOptions"
          dense
          borderless
          emit-value
          map-options
          options-dense
          bg-color="light-blue"
          style="min-width: 150px"
        >
          <template v-slot:prepend>
            <q-icon name="language" />
          </template>
        </q-select>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">LOGO</q-item-label>
        <q-item clickable tag="a" to="/films">{{
          $t("mainLayout.sidebar.films")
        }}</q-item>
        <q-item clickable tag="a" to="/people">{{
          $t("mainLayout.sidebar.people")
        }}</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'ru', label: 'Русский' }
      ]
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  }
}

</script>

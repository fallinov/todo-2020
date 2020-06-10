<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          ToDo
        </q-toolbar-title>

        <q-btn
          v-if="!user"
          to="/connexion"
          flat
          icon-right="account_circle"
          label="Se connecter"
          class="absolute-right"
        />

        <q-btn
          v-else
          @click="deconnecterUtilisateur"
          flat
          icon-right="account_circle"
          label="Se déconnecter"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          v-for="lien in liens"
          :key="lien.id"
          :to="lien.route"
          :icon="lien.icone"
          :label="lien.libelle"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="767"
      :width="250"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header>
          Menu de navigation
        </q-item-label>

        <q-item
          v-for="lien in liens"
          :key="lien.id"
          :to="lien.route"
          exact
          clickable
          class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="lien.icone" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ lien.libelle }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      liens: [
        {
          id: 1,
          libelle: 'Tâches',
          icone: 'list',
          route: '/'
        },
        {
          id: 2,
          libelle: 'Paramètres',
          icone: 'settings',
          route: '/params'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['deconnecterUtilisateur'])
  }
}
</script>

<style lang="scss">
  /* Applique les règles de ce bloc uniquement aux écrans >= 768px */
  @media screen and (min-width: 768px) {

    /* Cache les éléments avec la classe CSS q-footer */
    .q-footer {
      display: none;
    }

  }

  /* Lien actif du menu latéral */
  .q-drawer {
    .q-router-link--exact-active {
      color: $white !important;
    }
  }
</style>

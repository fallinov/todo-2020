<template>
  <q-page padding>

    <div
      v-if="!tachesChargees"
      class="q-pa-lg text-center"
    >
      <q-spinner-radio
        color="primary"
        size="4em"
      />
    </div>

    <q-list
      v-if="taches.length && tachesChargees"
      bordered
      separator
    >
      <tache
        v-for="tache in taches"
        :key="tache.id"
        :tache="tache"
      />
    </q-list>

    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="afficherFormTache = true"
      />
    </q-page-sticky>

    <q-dialog
      v-model="afficherFormTache"
      persistent
    >
      <form-tache
        @fermer="afficherFormTache = false"
        bouton="Ajouter"
      >
        Ajouter une tâche
      </form-tache>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PageTaches',
  data () {
    return {
      afficherFormTache: false
    }
  },
  computed: {
    ...mapGetters('taches', ['taches']),
    ...mapState('taches', ['tachesChargees'])
  },
  components: {
    tache: require('components/Taches/Tache').default,
    'form-tache': require('components/Taches/Dialog/FormTache').default
  }
}
</script>

<style lang="scss">

  .text-barre {
    text-decoration: line-through;
  }

</style>

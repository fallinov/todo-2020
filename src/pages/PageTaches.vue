<template>
  <q-page padding>
    <q-list
      v-if="taches.length"
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
import { mapGetters } from 'vuex'

export default {
  name: 'PageTaches',
  data () {
    return {
      afficherFormTache: false
    }
  },
  computed: {
    ...mapGetters('taches', ['taches'])
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

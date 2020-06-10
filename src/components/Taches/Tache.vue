<template>
  <q-item
    @click="modifierTache({
      id: tache.id,
      updates: {
        terminee: tache.terminee === 0 ? 1 : 0
      }
    })"
    clickable
    v-ripple
    :class="tache.terminee ? 'bg-green-1' : 'bg-orange-1'"
  >
    <q-item-section side>
      <q-checkbox
        :value="!!tache.terminee"
        class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-barre': tache.terminee }"
      >
        {{ tache.nom }}
      </q-item-label>
    </q-item-section>

    <q-item-section
      v-if="tache.dateFin"
      side
      top
    >
      <div class="row">
        <div class="column justify-center"> <!-- COL1 -->
          <q-icon
            name="event"
            size="18px"
            class="q-mr-xs"
          />
        </div>

        <div class="column"> <!-- COL2 -->
          <q-item-label caption class="text-right">
            {{ tache.dateFin }}
          </q-item-label>
          <q-item-label caption class="text-right">
            <small>{{ tache.heureFin }}</small>
          </q-item-label>
        </div>
      </div>

    </q-item-section>

    <q-item-section side>
      <q-btn flat
             round
             color="primary"
             icon="edit"
             dense
             @click.stop="afficherFormTache = true"
      />
    </q-item-section>

    <q-item-section side>
      <q-btn flat
             round
             color="negative"
             icon="delete"
             dense
             @click.stop="confirmerSuppression(tache.id)"
      />
    </q-item-section>

    <!-- Formulaire -->
    <q-dialog
      v-model="afficherFormTache"
      persistent
    >
      <form-tache
        @fermer="afficherFormTache = false"
        bouton="Modifier"
        :tacheAModifier="tache"
      >
        Modifier une tâche
      </form-tache>
    </q-dialog>
  </q-item>
</template>

<script>
// importation des fonctions utilitaires
import { mapActions } from 'vuex'

export default {
  name: 'Tache',
  props: {
    tache: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      afficherFormTache: false
    }
  },
  methods: {
    ...mapActions('taches', ['modifierTache', 'supprimerTache']),
    confirmerSuppression (id) {
      this.$q.dialog({
        title: 'Supprimer tâche',
        message: 'Voulez-vous vraiement supprimer cette tâche ?',
        cancel: 'Annuler',
        persistent: true
      }).onOk(() => {
        this.supprimerTache(id)
      })
    }
  },
  components: {
    'form-tache': require('components/Taches/Dialog/FormTache').default
  }
}
</script>

<style>

</style>

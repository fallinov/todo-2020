<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6"><slot></slot></div>
      <q-space/>
      <q-btn
        dense
        flat
        round
        icon="close"
        v-close-popup
      />
    </q-card-section>
    <q-form @submit="formSubmit">
      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="tache.nom"
          label="Nom"
          :rules="[valeur => (valeur.length > 0) || 'Le nom est obligatoire']"
          autofocus
          clearable
        />

        <q-input
          class="q-mt-sm"
          outlined
          readonly
          :value="dateFinLocale"
          label="Date"
          clearable
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="tache.dateFin"
                  mask="YYYY-MM-DD"
                  @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          v-if="tache.dateFin"
          class="q-mt-sm"
          outlined
          v-model="tache.heureFin"
          label="Heure"
          clearable
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                @before-show="heureTemp = tache.heureFin"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="heureTemp">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Annuler" color="primary" flat v-close-popup />
                    <q-btn
                      label="OK"
                      color="primary"
                      flat
                      @click="tache.heureFin = heureTemp"
                      v-close-popup
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
      <q-btn
        type="submit"
        :label="bouton"
        color="primary"
      />
    </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'FormTache',
  props: {
    tacheAModifier: {
      type: Object
    },
    bouton: {
      type: String,
      default: 'OK'
    }
  },
  data () {
    return {
      tache: {
        nom: '',
        dateFin: '',
        heureFin: '',
        terminee: 0
      },
      heureTemp: ''
    }
  },
  computed: {
    dateFinLocale () {
      const dateLocale = new Date(this.tache.dateFin)
      return date.formatDate(dateLocale, 'DD.MM.YY')
    }
  },
  methods: {
    ...mapActions('taches', ['ajouterTache', 'modifierTache']),
    // Méthode appelée à l'envoi du formulaire
    formSubmit () {
      // Si la tache a un id, c'est une modification sinon ajout
      if (this.tache.id) {
        // Construction du payload
        const payload = {
          id: this.tache.id,
          updates: this.tache // Passe toutes les proprités de la tache actuelle
        }
        // Appel l'action modifierTache et lui passe le payload
        this.modifierTache(payload)
      } else {
        // Appel l'action ajouterTache et lui passe la tache
        this.ajouterTache(this.tache)
      }

      // Demande la fermeture de la dialog au parent
      this.$emit('fermer')
    }
  },
  mounted () {
    if (this.tacheAModifier) {
      this.tache = Object.assign({}, this.tacheAModifier)
    }
  }
}
</script>

<style>
  .q-card {
    width: 400px;
    max-width: 80vw;
  }
</style>

// State : données du magasin
import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/functions/message-erreur'
import { Loading } from 'quasar'

const state = {
  taches: [],
  tachesChargees: false
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  modifierTache (state, payload) {
    // Recherche la tâche et retourne sa position dans le tableau, son index
    // Si introuvable, retourne -1
    const index = state.taches.findIndex(el => el.id === payload.id)
    if (index !== -1) {
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.taches[index], payload.updates)
    }
  },
  supprimerTache (state, id) {
    state.taches = state.taches.filter(el => el.id !== id)
  },
  ajouterTache (state, tache) {
    // Ajout de la tâche à fin du tableau
    state.taches.push(tache)
  },
  // Remplace le tableau des tâches
  setTaches (state, taches) {
    state.taches = taches
  },
  setTachesChargees (state, valeur) {
    state.tachesChargees = valeur
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  modifierTache ({ commit, rootState }, payload) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    // API : PUT /taches
    api.put('/taches/' + payload.id, payload.updates, config)
      .then(function (response) {
        // Affecte au payload les données retrounée par l'API
        payload.updates = response.data
        commit('modifierTache', payload)
      })
      .catch(function (error) {
        afficherMessageErreur(
          'Modification de tâche impossible !',
          Object.values(error.response.data)
        )
        throw error
      })
      .finally(Loading.hide())
  },
  supprimerTache ({ commit, rootState }, id) {
    Loading.show()
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    api.delete('/taches/' + id, config)
      .then(function () {
        commit('supprimerTache', id)
      })
      .catch(function (error) {
        afficherMessageErreur(
          'Supression de la tâche impossible !',
          Object.values(error.response.data)
        )
        throw error
      })
      .finally(Loading.hide())
  },
  ajouterTache ({ commit, rootState }, tache) {
    Loading.show()
    const config = {
      // Header avec Token
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api.post('/taches', tache, config)
      .then(function (response) {
        // Commite l'ajout
        commit('ajouterTache', response.data)
      })
      .catch(function (error) {
        afficherMessageErreur(
          'Création tâche impossible !',
          Object.values(error.response.data)
        )
        throw error
      })
      .finally(Loading.hide())
  },
  getTachesApi ({ commit, rootState }) {
    commit('setTachesChargees', false)
    const config = {
      // Header avec Token
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api.get('/taches', config)
      .then(function (response) {
        commit('setTaches', response.data)
        commit('setTachesChargees', true)
      })
      .catch(function (error) {
        afficherMessageErreur('Récupération des tâches impossible !')
        throw error
      })
  },
  viderTaches ({ commit }) {
    commit('setTaches', [])
    commit('setTachesChargees', false)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  taches: (state) => {
    return state.taches
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

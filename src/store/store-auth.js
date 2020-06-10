import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/functions/message-erreur'
import { Loading, LocalStorage } from 'quasar'

// State : données du magasin
const state = {
  user: null,
  token: null
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  enregistrerUtilisateur ({ commit, dispatch }, payload) {
    Loading.show()
    api.post('/register', payload)
      .then(function (response) {
        dispatch('setUser', response.data)
      })
      .catch(function (error) {
        Loading.hide()
        afficherMessageErreur(
          'Création du compte impossible !',
          Object.values(error.response.data)
        )
        throw error
      })
  },
  connecterUtilisateur ({ commit, dispatch }, payload) {
    Loading.show()
    api.post('/login', payload)
      .then(function (response) {
        dispatch('setUser', response.data)
      })
      .catch(function (error) {
        Loading.hide()
        afficherMessageErreur(
          'Connexion impossible !',
          Object.values(error.response.data)
        )
        throw error
      })
  },
  setUser ({ commit, state, dispatch }, data) {
    commit('setUser', data.user)
    commit('setToken', data.access_token)
    // Sauvegarder dans le localStorage
    LocalStorage.set('user', state.user)
    LocalStorage.set('token', state.token)
    // Récupération des tâches
    dispatch('taches/getTachesApi', null, { root: true })
    // Redirection vers la page des tâches
    this.$router.push('/')
    Loading.hide()
  },
  deconnecterUtilisateur ({ commit, state, dispatch }) {
    const that = this
    Loading.show()
    const config = {
      // Header avec Token
      headers: { Authorization: 'Bearer ' + state.token }
    }
    api.post('/logout', null, config)
      .catch(function (error) {
        Loading.hide()
        afficherMessageErreur('Déconnexion impossible !')
        throw error
      })
      .finally(function () {
        commit('setUser', null)
        commit('setToken', null)
        // Vide le localStorage
        LocalStorage.clear()
        // Vider les tâches
        dispatch('taches/viderTaches', null, { root: true })
        // Rediriger user
        that.$router.push('/connexion')
        Loading.hide()
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {

}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

<template>
  <form @submit.prevent="submitForm">
    <q-input
      outlined
      v-model="form.name"
      label="Nom d'utilisateur"
      class="q-my-md"
      :rules="[ val => val.length >= 4 || 'Minimum 4 caractère']"
      ref="nom"
    />

    <q-input
      outlined
      v-model="form.email"
      label="E-mail"
      class="q-my-md"
      :rules="[val => validateEmail(val) || 'Email invalide']"
      ref="email"
    />

    <q-input
      type="password"
      outlined
      v-model="form.password"
      label="Mot de passe"
      class="q-my-md"
      :rules="[ val => val.length >= 4 || 'Minimum 4 caractère']"
      lazy-rules
      ref="password"
    />

    <q-input
      type="password"
      outlined
      v-model="form.password_confirmation"
      label="Confirmer le mot de passe"
      class="q-my-md"
      :rules="[ val => val === form.password || 'Les mots de passe sont différents']"
      lazy-rules
      ref="password_confirmation"
    />

    <q-btn
      type="submit"
      color="primary"
      label="Créer un compte"
    />
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'EnregistrementForm',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['enregistrerUtilisateur']),
    submitForm () {
      // Lance la validation des champs
      this.$refs.nom.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.password_confirmation.validate()

      // Si il n'y a PAS d'erreur
      if (
        !this.$refs.nom.hasError &&
        !this.$refs.email.hasError &&
        !this.$refs.password.hasError &&
        !this.$refs.password_confirmation.hasError
      ) {
        this.enregistrerUtilisateur(this.form)
      }
    },
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

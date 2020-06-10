<template>
  <form @submit.prevent="submitForm">
    <q-input
      outlined
      v-model="form.email"
      label="E-mail"
      class="q-my-md"
      :rules="[val => validateEmail(val) || 'Email invalide']"
      lazy-rules
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

    <q-btn
      type="submit"
      color="primary"
      label="Se connecter"
    />
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ConnexionForm',
  data () {
    return {
      form: {
        email: 'steve.fallet@gmail.com',
        password: '12345'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['connecterUtilisateur']),
    submitForm () {
      // Lance la validation des champs
      this.$refs.email.validate()
      this.$refs.password.validate()

      // Test s'il y a des errreurs
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.connecterUtilisateur(this.form)
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

<style>

</style>

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('auth', ['setUser'])
  },
  mounted () {
    // Récupérer les infos du localStorage
    const user = this.$q.localStorage.getItem('user')
    const token = this.$q.localStorage.getItem('token')

    if (user && token) {
      const data = {
        user: user,
        access_token: token
      }
      this.setUser(data)
    }
  }
}
</script>

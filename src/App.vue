<template>
  <v-app id="Work" toolbar fixed-footer>
    <v-toolbar class="indigo" dark fixed>   
      <v-toolbar-title @click.stop="loadList()">
        <v-icon dark>home</v-icon>
        Work days
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="primary body-2" flat>
        Income :{{ hourlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}
      </v-btn> 
    </v-toolbar>
    <main>
      <v-container fluid="">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="indigo" fixed absolute text-xs-center>
      <span class="white--text">Made with ♥ in Berlin</span>
    </v-footer>
  </v-app>
</template>

<<script>
export default {
  computed: {
    hourlyIncome () {
      return 8.84
    }
  },
  methods: {
    loadList () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

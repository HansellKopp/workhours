<template>
  <v-app id="Work" toolbar fixed-footer>
    <v-toolbar class="indigo" dark fixed>   
      <v-toolbar-title @click.stop="loadList()">
        <v-icon dark>home</v-icon>
        Work days
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="primary body-2" flat @click.stop="showDialog = !showDialog">
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
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title primary-title>
            Set Income
            <v-spacer></v-spacer>
            <v-btn icon @click="cancel()"><v-icon>close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
              label="Income"
              v-model="hourlyIncome"
              type="number"
              class="input-group--focused"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn success @click="saveIncome()">
            <v-icon left dark>save</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<<script>
import { WorkDays } from './api'

export default {
  data () {
    return {
      hourlyIncome: 0,
      showDialog: false
    }
  },
  mounted () {
    this.workdays = new WorkDays(this.$localStorage)
    this.hourlyIncome = this.workdays.getHourlyIncome()
  },
  methods: {
    loadList () {
      this.$router.push('/')
    },
    saveIncome () {
      this.showDialog = !this.showDialog
      this.workdays.setHourlyIncome(this.hourlyIncome)
    },
    cancel () {
      this.hourlyIncome = this.workdays.getHourlyIncome()
      this.showDialog = !this.showDialog
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

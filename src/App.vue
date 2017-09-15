<template>
  <v-app id="Work" toolbar fixed-footer>
    <v-toolbar class="indigo" dark fixed>      
      <v-toolbar-title @click.stop="loadList()" style="{cursor: hand}">
        <v-btn icon @click.stop="loadList()"><v-icon dark>home</v-icon></v-btn>
        {{ $t("message.title") }}                
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outline dark class="primary body-2" flat @click.stop="showDialog = !showDialog">
        {{ $t("message.income") }}: {{ $n(settings.hourlyIncome, 'currency')}}
      </v-btn> 
    </v-toolbar>
    <main>
      <v-container fluid>        
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="indigo" fixed absolute text-xs-center>
      <span class="white--text">Made with ♥ in Berlin</span>
      <v-spacer></v-spacer>
       <v-btn icon @click="setLocale('es-ES')"><img class="flag flag-es"/></v-btn>
       <v-btn icon @click="setLocale('en-US')"><img class="flag flag-us"/></v-btn>
       <v-btn icon @click="setLocale('de-DE')"><img class="flag flag-de"/></v-btn>
    </v-footer>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title primary-title>
            {{ $t("message.setincome.title") }}
            <v-spacer></v-spacer>
            <v-btn icon @click="cancel()"><v-icon>close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
              :label="$t('message.setincome.label')"
              v-model="settings.hourlyIncome"
              type="number"
              class="input-group--focused"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn success @click="saveIncome()">
            <v-icon left dark>save</v-icon>
            {{ $t("message.buttons.save") }}
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
      settings: {hourlyIncome: 0, currentFilter: ''},
      showDialog: false
    }
  },
  mounted () {
    this.workdays = new WorkDays(this.$localStorage)
    this.settings = this.workdays.getSettings()
    if (this.settings.locale) {
      this._i18n.locale = this.settings.locale
    }
  },
  methods: {
    loadList () {
      this.$router.push('/')
    },
    saveIncome () {
      this.showDialog = !this.showDialog
      this.workdays.setHourlyIncome(this.settings.hourlyIncome)
    },
    cancel () {
      this.settings = this.workdays.getSettings()
      this.showDialog = !this.showDialog
    },
    setLocale (lang) {
      this._i18n.locale = lang
      this.workdays.setLocale(lang)
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

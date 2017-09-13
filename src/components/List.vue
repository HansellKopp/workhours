<template>
 <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-title class="blue accent-2">
            <v-select
              label="Month Active"
              :items="availableFilters"
              v-model="settings.currentFilter" 
              dark prepend-icon="date_range"
              @change="changeFilter"
            >
            </v-select>        
        </v-card-title>
          <v-btn
            fab
            small
            class="green"
            top
            right
            absolute
            dark
            @click.native.stop="createItem"
          >
            <v-icon>add</v-icon>
          </v-btn>
        <v-list two-line>
          <template v-for="item in workdayItems" >
            <v-list-tile 
              avatar 
              :key="item.id"
              :to="{ name: 'View', params: { id: item.id } }"
              >
              <v-list-tile-avatar>
                <v-chip class="green white--text">{{ item.start | moment("DD") }}</v-chip>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title> 
                  <span>{{ item.start | moment("HH:mm a") }} - {{ item.end | moment("HH:mm a") }}</span>   
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <span> ({{ item.lapse }})</span>
                  {{ item.income.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}  
                </v-list-tile-sub-title>
              </v-list-tile-content>
          </v-list-tile>
          </template>
        </v-list>
        <v-card-actions  class="blue accent-2 white--text">
          <v-spacer></v-spacer>
          <span class="white--text text-xs-right body-2">
            Total :{{ totalIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}
          </span>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { WorkDays } from '../api'

export default {
  data () {
    return {
      selected: '',
      workdays: null,
      workdayItems: [],
      dialogStart: false,
      settings: {hourlyIncome: 0, currentFilter: ''},
      availableFilters: []
    }
  },
  mounted () {
    this.workdays = new WorkDays(this.$localStorage)
    this.settings = this.workdays.getSettings()
    this.workdayItems = this.workdays.getAll(this.settings.currentFilter)
    this.availableFilters = this.workdays.getAvailableFilters()
  },
  methods: {
    changeFilter (e) {
      this.workdays.setCurrentFilter(e)
      this.workdayItems = this.workdays.getAll(e)
    },
    createItem () {
      this.$router.push('new')
    },
    viewItem () {
      this.$router.push('view')
    }
  },
  computed: {
    totalHours () {
      return this.workdays ? this.workdays.totalHours(this.workdayItems) : 0
    },
    totalIncome () {
      return this.workdays ? this.workdays.totalIncome(this.workdayItems) : 0
    },
    itemsCount () {
      return this.workdays ? this.workdayItems.length : 0
    }
  }
}
// <div class="white--text headline">{{ settings.currentFilter }}</div>
</script>

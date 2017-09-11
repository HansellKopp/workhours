<template>
 <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-title class="blue accent-2">
          <div class="white--text headline">September 2017</div>
          <v-spacer></v-spacer>
          <v-btn
            fab
            small
            relative
            right
            class="green accent-4"
            @click.native.stop="createItem()"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
        <v-list two-line>
          <template v-for="item in workdayItems" >
            <v-list-tile 
              avatar 
              v-bind:key="item.id"
              :to="{ name: 'View', params: { id: item.id } }"
              >
              <v-list-tile-avatar>
                <v-chip class="green white--text">{{ item.date | moment("DD") }}</v-chip>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title> 
                  <span>{{ item.start | moment("HH:mm a") }} - {{ item.end | moment("HH:mm a") }}</span>   
                  ({{ item.lapse }})
                </v-list-tile-title>
                <v-list-tile-sub-title>
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
      workdays: null,
      workdayItems: [],
      hourlyIncome: 0,
      dialogStart: false
    }
  },
  mounted () {
    this.workdays = new WorkDays(this.$localStorage)
    this.workdayItems = this.workdays.getAll()
    this.hourlyIncome = this.workdays.getHourlyIncome()
  },
  methods: {
    createItem () {
      this.$router.push('new')
    },
    viewItem () {
      this.$router.push('view')
    },
    lapse (item) {
      return this.workdays.lapse(item)
    },
    income (item) {
      return this.workdays.income(item)
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
</script>

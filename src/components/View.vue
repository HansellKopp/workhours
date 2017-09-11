<template>
    <v-card>
        <v-card-title primary-title>
            <div>{{ item.date | moment("dddd, MMMM Do YYYY") }}</div>
        </v-card-title>
        <v-card-text>
            <p>Start: {{ item.start | moment("HH:mm a") }}</p>
            <p>End: {{ item.end |  moment("HH:mm a") }}</p>
            <v-divider></v-divider>
            <p>Hours: {{ item.lapse }}</p>
            <v-divider></v-divider>
            <p>Income: {{ item.income.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn success :to="{ name: 'Edit', params: { id: this.id } }">
                <v-icon left dark>edit</v-icon>
                Edit
            </v-btn>
            <v-btn error @click="deleteItem()">
                <v-icon left dark>delete</v-icon>
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<<script>
import { WorkDays } from '../api'

export default {
  props: ['id'],
  data () {
    return {
      item: {date: new Date(), start: new Date(), end: new Date(), income: 0},
      workdays: null
    }
  },
  methods: {
    load () {
      this.item = this.workdays.getById(this.id)
      if (!this.item) {
        this.$router.push('/')
      }
    },
    deleteItem () {
      this.workdays.delete(this.item.id)
      this.$router.push('/')
    }
  },
  mounted () {
    this.workdays = new WorkDays(this.$localStorage)
    this.load()
  }
}
</script>

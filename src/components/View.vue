<template>
    <v-card>
        <v-card-title primary-title>
            <div>{{ $d(item.date, 'long') }}</div>
        </v-card-title>
        <v-card-text>
            <p>{{ $t("message.start") }}: {{ item.start | moment("HH:mm a") }}</p>
            <p>{{ $t("message.end") }}: {{ item.end | moment("HH:mm a") }}</p>
            <v-divider></v-divider>
            <p>{{ $t("message.hours") }}: {{ item.lapse }}</p>
            <v-divider></v-divider>
            <p>{{ $t("message.income") }}: {{ $n(item.income, 'currency') }}</p>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn success :to="{ name: 'Edit', params: { id: this.id } }">
                <v-icon left dark>edit</v-icon>
                {{ $t("message.buttons.edit") }}
            </v-btn>
            <v-btn error @click="deleteItem()">
                <v-icon left dark>delete</v-icon>
                {{ $t("message.buttons.delete") }}
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

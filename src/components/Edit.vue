<template>
  <v-container>
      <v-layout row justify-center style="position: relative;">
          <v-date-picker v-model="item.date"></v-date-picker>
          <v-btn
            fab
            absolute
            right
            class="mt-4"
            success
            dark
            @click.native.stop="saveItem()"
          >
          <v-icon>save</v-icon>
        </v-btn>
      </v-layout>
    <v-layout row justify-center style="position: relative;" >
      <v-btn primary="" @click.native.stop="dialogStart = true">Start: {{ item.start }}</v-btn>
      <v-btn primary="" @click.native.stop="dialogEnd = true">End: {{ item.end }}</v-btn>
    </v-layout>
    <v-dialog v-model="dialogStart">
      <v-flex row>
        <v-time-picker v-model="item.start"></v-time-picker>
      </v-flex>
      <v-flex row class="primary text-xs-right">
        <v-btn @click.native="dialogStart = false">
          <v-icon left>check</v-icon>
          OK
        </v-btn>
      </v-flex>
    </v-dialog>
        <v-dialog v-model="dialogEnd">
      <v-flex row>
        <v-time-picker v-model="item.end"></v-time-picker>
      </v-flex>
      <v-flex row class="primary text-xs-right">
        <v-btn @click.native="dialogEnd = false">
          <v-icon left>check</v-icon>
          OK
        </v-btn>
      </v-flex>
    </v-dialog>
  </v-container>
</template>

<script>
  import { WorkDays } from '../api'
  import moment from 'moment'

  export default {
    props: ['id'],
    data () {
      return {
        workdays: null,
        dialogStart: false,
        dialogEnd: false,
        item: {
          date: new Date(),
          start: moment().format('HH:mm a'),
          end: moment().format('HH:mm a')
        }
      }
    },
    mounted () {
      this.workdays = new WorkDays(this.$localStorage)
      const item = this.workdays.getById(this.id)
      if (item) {
        this.item = {
          id: this.id,
          date: item.date,
          start: moment(item.start).format('HH:mm a'),
          end: moment(item.end).format('HH:mm a')
        }
      }
    },
    methods: {
      saveItem () {
        this.workdays.save({
          id: this.id,
          date: this.item.date,
          start: this.item.start,
          end: this.item.end
        })
        this.$router.push('/')
      }
    }
  }
</script>

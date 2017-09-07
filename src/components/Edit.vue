<template>
  <v-container>
    <v-layout row="" justify-center="" style="position: relative;">
      <v-date-picker v-model="date"></v-date-picker>
    </v-layout>
    <v-layout row="" justify-center="" style="position: relative;">
      <v-btn primary="" @click.native.stop="dialogStart = true">Start: {{ startDate }}</v-btn>
      <v-btn primary="" @click.native.stop="dialogEnd = true">End: {{ endDate }}</v-btn>
      <v-dialog v-model="dialogStart">
        <v-time-picker v-model="startDate"></v-time-picker>
        <v-spacer></v-spacer>
        <v-btn class="white--text" flat="flat" @click.native="dialogStart = false">Save</v-btn>
      </v-dialog>
      <v-dialog v-model="dialogEnd">
        <v-time-picker v-model="endDate"></v-time-picker>
        <v-spacer></v-spacer>
        <v-btn class="white--text" flat="flat" @click.native="dialogEnd = false">Save</v-btn>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        date: null,
        startDate: null,
        endDate: null,
        dialogStart: false,
        dialogEnd: false
      }
    },
    mounted () {
      this.start = `${new Date().getHours()}:${new Date().getMinutes()}`
      this.end = `${new Date().getHours()}:${new Date().getMinutes()}`
    }
  }
</script>

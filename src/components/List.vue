<template>
  <div>
    <v-list two-line>
      <template v-for="item in items" >
        <v-subheader v-if="item.header" v-text="item.header" class="primary--text"></v-subheader>
        <v-list-tile avatar v-else v-bind:key="item.title">
          <v-avatar>
            <span class="red--text headline">{{ item.day }}</span>
          </v-avatar>        
          <v-list-tile-content>
            <v-list-tile-title>{{ item.start }} {{ item.end }}</v-list-tile-title>
            <v-list-tile-sub-title v-html="item.income"></v-list-tile-sub-title>
          </v-list-tile-content>
      </v-list-tile>
      </template>
    </v-list>
    <v-btn
        absolute
        dark
        fab
        top
        right
        class="pink mt-5"
        @click="this.$router.push('edit')"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { header: 'July' },
        { day: '01', start: '10:00', end: '12:00', income: '10€' },
        { day: '02', start: '10:00', end: '12:00', income: '10€' },
        { day: '03', start: '10:00', end: '12:00', income: '10€' },
        { day: '04', start: '10:00', end: '12:00', income: '10€' },
        { day: '05', start: '10:00', end: '12:00', income: '10€' },
        { day: '06', start: '10:00', end: '12:00', income: '10€' },
        { day: '07', start: '10:00', end: '12:00', income: '10€' },
        { day: '08', start: '10:00', end: '12:00', income: '10€' },
        { day: '09', start: '10:00', end: '12:00', income: '10€' },
        { day: '10', start: '10:00', end: '12:00', income: '10€' },
        { day: '12', start: '10:00', end: '12:00', income: '10€' },
        { day: '13', start: '10:00', end: '12:00', income: '10€' },
        { day: '14', start: '10:00', end: '12:00', income: '10€' },
        { day: '15', start: '10:00', end: '12:00', income: '10€' },
        { day: '16', start: '10:00', end: '12:00', income: '10€' },
        { day: '17', start: '10:00', end: '12:00', income: '10€' },
        { day: '18', start: '10:00', end: '12:00', income: '10€' },
        { day: '19', start: '10:00', end: '12:00', income: '10€' }
      ]
    }
  }
}
</script>

<template>
  <v-app id="Work" toolbar footer>
    <v-toolbar class="indigo" dark="">      
      <v-toolbar-title>Work days</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid="">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="indigo">
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>


<style lang="stylus">
  @import './stylus/main'
</style>

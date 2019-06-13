<template>
  <div id="app" light>
  <v-toolbar fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Software Collection by Waldo Milanes</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat><router-link to="/">Home</router-link> </v-btn>
      <v-btn flat>      <router-link to="/collection">Collection</router-link></v-btn>
      <v-btn flat>      <router-link to="/about">About</router-link></v-btn>
      <v-btn flat>      <router-link to="/login">Login</router-link></v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <router-view/>
  </div>
</template>

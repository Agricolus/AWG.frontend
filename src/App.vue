<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
<pre v-if="appconfig.env == 'development'">
configuration: {{ appconfig }}
</pre>
  </div>
</template>
<script lang="ts" src="./App.ts"></script>
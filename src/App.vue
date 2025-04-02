<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navigation_Top_Bar from './components/navigation/Navigation_Top_Bar.vue'
</script>

<template>
  <header>
    <Navigation_Top_Bar />
  </header>

  <RouterView />
</template>

<style scoped></style>

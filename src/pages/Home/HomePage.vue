<script setup lang="ts">
import { Hero, Features } from "@/components/home";
</script>

<template>
  <main class="main">
    <Hero />
    <Features />
  </main>
</template>

<style scoped>
section {
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  max-width: 55rem;
  margin: 0 auto;
}
</style>

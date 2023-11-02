<script setup lang="ts">
import { features } from "@/constants";
import { Feature } from ".";
</script>

<template>
  <section class="features">
    <header>
      <h2 class="heading">Features</h2>
      <p class="description">
        Discover the power of our app with a robust set of features designed to
        transform your productivity and task management.
      </p>
    </header>
    <div class="features-wrapper">
      <Feature
        v-for="feature in features"
        :key="feature.title"
        :title="feature.title"
        :description="feature.description"
      />
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 1rem 2rem 2rem;
}

.heading {
  font-size: 2rem;
  margin: 0 auto 1rem;
  width: max-content;
  background: linear-gradient(to bottom right, #e06486, #5d69bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.features-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
</style>

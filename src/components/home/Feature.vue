<script setup lang="ts">
const { title, description } = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <article class="feature">
    <h3 class="title">{{ title }}</h3>
    <p class="description">
      {{ description }}
    </p>
  </article>
</template>

<style scoped>
.feature {
  width: 16rem;
  flex-grow: 1;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.title {
  margin-bottom: 1rem;
}

.description {
  color: #bbb;
  font-size: 1rem;
  line-height: 1.5;
}
</style>

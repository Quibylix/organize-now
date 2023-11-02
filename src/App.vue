<script setup lang="ts">
import { Icon } from "@/components";
import { Features } from "./components/home";
</script>

<template>
  <main class="main">
    <section class="hero">
      <img
        class="image"
        loading="eager"
        src="/images/productivity-man.png"
        width="300"
        height="468"
        alt=""
      />
      <h1 class="heading">Organize Now!</h1>
      <p class="description">
        Organize your life with this simple app. Create a list of things to do,
        check them off as you go, and get things done!
      </p>
      <a class="start" href="#">
        Get Started
        <span class="icon-container">
          <Icon name="right-arrow" />
        </span>
      </a>
    </section>
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

.hero {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.image {
  max-width: 70%;
  width: 300px;
  height: auto;
  margin: 0 auto;
  display: block;
}

.heading {
  text-align: center;
  font-size: 2.5rem;
  padding: 1rem 0;
}

.description {
  color: #bbb;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
}

.start {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin: 2.5rem auto 0;
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to bottom right, #e06486, #5d69bb);
  color: #fff;
  font-size: 1.2rem;
  transition: transform 0.3s linear;
}

.start:hover {
  transform: scale(1.05);
}

.icon-container {
  font-size: 1.8rem;
}
</style>

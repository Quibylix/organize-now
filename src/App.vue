<script setup lang="ts">
import { Icon } from "@/components";
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
    <section class="features">
      <header>
        <h2 class="features-title">Features</h2>
        <p class="features-description">
          Discover the power of our app with a robust set of features designed
          to transform your productivity and task management.
        </p>
      </header>
      <div class="features-wrapper">
        <article class="feature">
          <h3 class="feature-title">Create Tasks</h3>
          <p class="feature-description">
            Effortlessly add and manage tasks for all aspects of your life. From
            work projects to personal to-dos, our app makes it easy to stay on
            top of your tasks.
          </p>
        </article>
        <article class="feature">
          <h3 class="feature-title">Create Appointments</h3>
          <p class="feature-description">
            Schedule appointments and events with precision. Never miss an
            important meeting or event again, thanks to our intuitive
            appointment creation tools.
          </p>
        </article>
        <article class="feature">
          <h3 class="feature-title">Set Due Dates and Reminders</h3>
          <p class="feature-description">
            Stay organized and meet your deadlines by setting due dates for
            tasks and appointments. Receive timely reminders to keep you on
            track.
          </p>
        </article>
        <article class="feature">
          <h3 class="feature-title">Organize Tasks into Projects</h3>
          <p class="feature-description">
            Bring structure to your tasks by grouping them into projects.
            Streamline your workflow and achieve greater focus on what matters
            most.
          </p>
        </article>
      </div>
    </section>
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

.features {
  padding: 1rem 2rem 2rem;
}

.features-title {
  font-size: 2rem;
  margin: 0 auto 1rem;
  width: max-content;
  background: linear-gradient(to bottom right, #e06486, #5d69bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-description {
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

.feature {
  width: 16rem;
  flex-grow: 1;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feature-title {
  margin-bottom: 1rem;
}

.feature-description {
  color: #bbb;
  font-size: 1rem;
  line-height: 1.5;
}
</style>

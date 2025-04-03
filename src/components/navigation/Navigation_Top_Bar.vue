<script setup lang="ts">
import IconMessage from '../icons/IconMessage.vue'
import IconMan from '../icons/IconMan.vue'
</script>

<template>
  <section>
    <RouterLink to="/" class="logo">
      <h1>LePetitMauvaisCoin</h1>
    </RouterLink>
    <div class="link_container">
      <a href="/my-messages">
        <IconMessage />
        <span>Messages</span>
      </a>
      <a href="/logIn">
        <IconMan />
        <span>Se connecter</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.logo {
  text-decoration: none;
}

section {
  width: 100%;
  padding: 10px 20px;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: max-content;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: var(--text-h1);
  font-weight: 700;
  color: #000;
}

.link_container {
  width: 100%;
  height: 50px;
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: end;
}

.link_container a {
  display: flex;
  text-decoration: none;
  color: var(--vt-c-black);
  font-size: var(--text-h2);
  flex-direction: column;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  height: 100%;
}
</style>

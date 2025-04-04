<script setup lang="ts">
import IconMessage from '../icons/IconMessage.vue'
import IconMan from '../icons/IconMan.vue'
import IconAddAnnonce from '../icons/IconAddAnnonce.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isUserConnected = ref(false)

onMounted(() => {
  checkUserConnection()
})

function checkUserConnection() {
  const user = localStorage.getItem('userConnected')
  isUserConnected.value = !!user
}

function handleLogout() {
  localStorage.removeItem('userConnected')
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  isUserConnected.value = false
  router.push('/login')
}
</script>

<template>
  <section>
    <RouterLink to="/" class="logo">
      <h1>LePetitMauvaisCoin</h1>
    </RouterLink>
    <div class="link_container">
      <a href="/add-annonce">
        <IconAddAnnonce />
        <span>Creer une annonce</span>
      </a>
      <a v-if="!isUserConnected" href="/logIn">
        <IconMan />
        <span>Se connecter</span>
      </a>
      <a v-else @click="handleLogout" class="logout-btn">
        <IconMan />
        <span>Se déconnecter</span>
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

.logout-btn {
  color: #dc3545 !important;
  transition: color 0.3s ease;
}

.logout-btn:hover {
  color: #bd2130 !important;
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
  transition: transform 0.2s ease;
}

.link_container a:hover {
  transform: translateY(-2px);
}
</style>

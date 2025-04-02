<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Annonce {
  idAnnonce: string
}

const route = useRoute()
const annonce = ref<Annonce | null>(null)
const error = ref<string | null>(null)

const fetchAnnonceById = async () => {
  try {
    const res = await fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?annonces')
    const json = await res.json()

    const found = json.find((item: Annonce) => item.idAnnonce === route.params.id)
    if (!found) {
      error.value = 'Annonce not found'
      return
    }

    annonce.value = found
    console.log(annonce)
  } catch (err) {
    error.value = 'Error fetching annonce'
    console.error(err)
  }
}

onMounted(() => {
  fetchAnnonceById()
})
</script>

<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="annonce">
      <!-- Display your annonce data here -->
      <p>Annonce ID: {{ annonce.idAnnonce }}</p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  padding: 1rem;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Body from '../../components/_id/Body.vue'

interface Annonce {
  idAnnonce: string
  idCategorie: string
  idUser: string
  user_email: string
  user_nom: string
  titre: string
  description: string
  prix: number
  categorie_nom: string
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
      <Body :title="annonce.titre" :description="annonce.description" :prix="annonce.prix" />
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

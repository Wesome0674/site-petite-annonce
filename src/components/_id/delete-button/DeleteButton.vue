<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  annonceId: string
}>()

const router = useRouter()
const isLoading = ref(false)
const error = ref<string | null>(null)

const deleteAnnonce = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) return

  isLoading.value = true
  error.value = null

  try {
    const res = await fetch(
      `https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?annonce=${props.annonceId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!res.ok) {
      throw new Error('Échec lors de la suppression')
    }

    await res.json()
    router.push('/')
  } catch (err) {
    error.value = 'Échec lors de la suppression'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="delete-container">
    <p v-if="error" class="error">{{ error }}</p>
    <button @click="deleteAnnonce" :disabled="isLoading" class="delete-button">
      {{ isLoading ? 'Supression...' : 'Supprimer l&rsquo;annonce' }}
    </button>
  </div>
</template>

<style scoped>
.delete-container {
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: max-content;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 12px 15px;
  border: none;
  font-size: var(--h2);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.delete-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  font-size: var(--h2);
}
</style>

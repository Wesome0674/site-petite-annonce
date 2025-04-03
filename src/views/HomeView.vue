<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  setup() {
    // Create refs to store data
    const all_annonce = ref([])
    const all_categorie = ref([])
    const filteredCat = ref([])
    const router = useRouter() // Initialize Vue Router
    const idAnnonce = ref('')

    // Function to fetch all annonces
    function getAllAnnonces() {
      fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?annonces')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Annonces:', data)
          all_annonce.value = data // Store the fetched data in the ref
          filteredCat.value = data // Initially show all annonces

          // Extract unique categories
          const uniqueCategories = new Set()
          data.forEach((element) => {
            if (element.categorie_nom) {
              uniqueCategories.add(element.categorie_nom)
            }
          })
          all_categorie.value = Array.from(uniqueCategories) // Convert Set to Array
        })
        .catch((error) => {
          console.error('Error fetching annonces:', error)
        })
    }

    // Function to filter annonces by category
    function switchCat(cat) {
      if (cat === 'All') {
        // Show all annonces if "All" is clicked
        filteredCat.value = all_annonce.value
      } else {
        // Filter annonces by the selected category
        filteredCat.value = all_annonce.value.filter((e) => e.categorie_nom === cat)
      }
    }

    // Function to navigate to the annonce details page
    function goToAnnonce(idAnnonce) {
      router.push(`/annonce/${idAnnonce}`) // Navigate to /annonce/:idAnnonce
    }

    // Fetch annonces when the component is mounted
    onMounted(() => {
      getAllAnnonces()
    })

    return {
      all_annonce,
      all_categorie,
      filteredCat,
      switchCat,
      goToAnnonce,
    }
  },
}
</script>

<template>
  <div id="home_page">
    <!-- Display category badges -->
    <div class="badge" @click="switchCat('All')">All</div>
    <div class="badge" v-for="(cat, index) in all_categorie" :key="index">
      <p @click="switchCat(cat)">{{ cat }}</p>
    </div>

    <!-- Display filtered annonces -->
    <div
      class="card"
      v-for="annonce in filteredCat"
      :key="annonce.id"
      @click="goToAnnonce(annonce.idAnnonce)"
    >
      <p>{{ annonce.titre }}</p>
      <p>{{ annonce.description }}</p>
      <p>{{ annonce.prix }} €</p>
    </div>
  </div>
</template>

<style>
#home_page {
  width: 80vw;
}

.card {
  height: 300px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.card:hover {
  background-color: #f9f9f9;
}

.badge {
  display: inline-block;
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.badge:hover {
  background-color: #0056b3;
}
</style>

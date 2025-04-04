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
    <!-- Category filters section -->
    <div class="categories-container">
      <div class="badge" @click="switchCat('All')">All</div>
      <div class="badge" v-for="(cat, index) in all_categorie" :key="index">
        <p @click="switchCat(cat)">{{ cat }}</p>
      </div>
    </div>

    <!-- Annonces grid -->
    <div class="annonces-grid">
      <div
        class="card"
        v-for="annonce in filteredCat"
        :key="annonce.id"
        @click="goToAnnonce(annonce.idAnnonce)"
      >
        <h3 class="card-title">{{ annonce.titre }}</h3>
        <p class="card-description">{{ annonce.description }}</p>
        <p class="card-price">{{ annonce.prix }} €</p>
      </div>
    </div>
  </div>
</template>

<style>
#home_page {
 
  padding: 20px;
}

.categories-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.badge:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.badge p {
  margin: 0;
}

.annonces-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  height: auto;
  min-height: 200px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.card-description {
  font-size: 0.9rem;
  color: #666;
  margin: 10px 0;
  line-height: 1.5;
}

.card-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #27ae60;
  margin: 10px 0 0 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  #home_page {
    width: 95%;
    padding: 10px;
  }

  .annonces-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }

  .card {
    padding: 15px;
  }
}
</style>

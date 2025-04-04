<template>
  <div class="form-container">
    <h2 class="form-title">Créer une nouvelle annonce</h2>
    <form @submit.prevent="submit" class="annonce-form">
      <div class="form-group">
        <label for="titre">Titre</label>
        <input v-model="titre" type="text" name="titre" id="titre" placeholder="Titre de l'annonce" />
      </div>

      <div class="form-group">
        <label for="price">Prix</label>
        <input v-model="price" type="number" name="price" id="price" placeholder="Prix en euros" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          v-model="desc"
          name="desc"
          id="description"
          placeholder="Description détaillée de l'annonce"
          rows="4"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="categorie">Catégorie</label>
        <select v-model="categorie" name="categorie" id="categorie">
          <option v-for="cat in All_data" :value="cat.idCategorie" :key="cat.idCategorie">
            {{ cat.nom }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-btn">Créer une annonce</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.annonce-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

input,
textarea,
select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

select {
  background-color: white;
  cursor: pointer;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    margin: 1rem;
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }
}
</style>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'AddAnnonce',
  setup() {
    let id_user = ref(1) // Default user ID
    let desc = ref('') // Description of the ad
    let titre = ref('') // Title of the ad
    let categorie = ref('') // Selected category
    let price = ref('') // Price of the ad
    let All_data = ref([]) // Categories fetched from the API

    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?categories',
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('Categories:', data)
        All_data.value = data // Update the ref's value

        // Set the default value of categorie to the first category's idCategorie
        if (data.length > 0) {
          categorie.value = data[0].idCategorie
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    // Submit the form
    function submit() {
      console.log('Annonce créée !')
      createAnnonce()
    }

    // Create a new ad
    function createAnnonce() {
      const annonceData = {
        type: 'annonces',
        titre: titre.value,
        description: desc.value,
        prix: price.value.toString(),
        idUser: id_user.value.toString(),
        idCategorie: categorie.value,
      }

      console.log(annonceData)

      fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(annonceData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Annonce created:', data)
          window.location.reload() // Reload the page
          window.location.href = '/' // Redirect to home page
        })
        .catch((error) => {
          console.error('Error creating annonce:', error)
        })
    }

    // Fetch categories when the component is mounted
    onMounted(() => {
      fetchCategories()
    })

    return {
      All_data,
      categorie,
      titre,
      price,
      desc,
      id_user,
      createAnnonce,
      submit,
    }
  },
}
</script>

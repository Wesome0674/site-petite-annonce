<template>
  <div>
    <form @submit.prevent="submit">
      <label>
        <input v-model="titre" type="text" name="titre" id="titre" placeholder="Titre" />
      </label>
      <label>
        <input v-model="price" type="number" name="price" id="price" placeholder="Prix" />
      </label>
      <label>
        <input v-model="desc" type="text" name="desc" id="description" placeholder="Description" />
      </label>
      <select v-model="categorie" name="categorie" id="categorie">
        <option v-for="cat in All_data" :value="cat.idCategorie" :key="cat.idCategorie">
          {{ cat.nom }}
        </option>
      </select>
      <input type="submit" value="Créer une annonce" />
    </form>
  </div>
</template>

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
        prix: price.value.toString(), // Convert price to string
        idUser: id_user.value.toString(), // Convert user ID to string
        idCategorie: categorie.value, // Category ID
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

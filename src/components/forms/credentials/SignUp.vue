<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

async function createUser(e: Event) {
  e.preventDefault()

  try {
    const passwordBytes = new TextEncoder().encode(password.value)
    const hashedBuffer = await crypto.subtle.digest('SHA-256', passwordBytes)
    const hashedArray = new Uint8Array(hashedBuffer)
    const hashedPassword = Array.from(hashedArray)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')

    const userData = {
      type: 'users',
      nom: name.value,
      email: email.value.toLowerCase(),
      password: hashedPassword,
    }

    const response = await fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('User created:', data)

    window.location.href = '/logIn'
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <form class="login-form" @submit="createUser">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required placeholder="Enter your name" />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        placeholder="Enter your password"
      />
    </div>

    <button type="submit" class="submit-btn">Sign Up</button>
  </form>
</template>

<style scoped></style>

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
  <div class="signup-container">
    <form class="signup-form" @submit="createUser">
      <h2 class="form-title">Create Account</h2>

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required placeholder="Enter your name" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
      </div>

      <button type="submit" class="submit-btn">Sign Up</button>
      
      <p class="login-link">
        Already have an account? <a href="/logIn">Log in</a>
      </p>
    </form>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.signup-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #3498db;
  color: white;
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

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #64748b;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signup-form {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
}
</style>

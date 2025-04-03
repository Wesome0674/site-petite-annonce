<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const normalizedEmail = computed(() => email.value.toLowerCase())

function setAuthCookie(userData: any) {
  const token = btoa(JSON.stringify(userData))
  const expirationTime = new Date()
  expirationTime.setMinutes(expirationTime.getMinutes() + 10)

  document.cookie = `authToken=${token}; expires=${expirationTime.toUTCString()}; path=/`

  setTimeout(
    () => {
      logout()
    },
    10 * 60 * 1000,
  )
}

function logout() {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  router.push('/logIn')
}

async function verifyPassword(e: Event) {
  e.preventDefault()
  const passwordBytes = new TextEncoder().encode(password.value)
  error.value = ''
  isLoading.value = true

  try {
    const hashedBuffer = await crypto.subtle.digest('SHA-256', passwordBytes)
    const hashedArray = new Uint8Array(hashedBuffer)
    const hashedPassword = Array.from(hashedArray)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')

    const usersResponse = await fetch(
      'https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?users',
    )

    const json = await usersResponse.json()

    const user = json.find(
      (user: { email: string; password: string }) =>
        user.email.toLowerCase() === normalizedEmail.value && user.password === hashedPassword,
    )

    localStorage.setItem('userConnected', JSON.stringify(user))

    if (user) {
      // Create authentication cookie if user is found
      setAuthCookie({
        email: user.email,
        timestamp: new Date().getTime(),
      })
      router.push('/') // Redirect to home page after successful login
    } else {
      error.value = 'Invalid email or password'
    }

    if (!usersResponse.ok) {
      throw new Error('Failed to fetch users')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="login-form" @submit="verifyPassword">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
        placeholder="Enter your email"
        :disabled="isLoading"
      />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required
        placeholder="Enter your password"
        :disabled="isLoading"
      />
    </div>

    <button type="submit" class="submit-btn" :disabled="isLoading">
      {{ isLoading ? 'Logging in...' : 'Login' }}
    </button>
    <p>Ou créez votre compte <a href="/signUp">Sign up</a></p>
  </form>
</template>

<style scoped>
.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #f8d7da;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

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
      window.location.reload() // Reload the page
      window.location.href = "/"
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
  <div class="login-container">
    <form class="login-form" @submit="verifyPassword">
      <h2 class="form-title">Login</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="form-group">
        <label for="email">Email</label>
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
        <label for="password">Password</label>
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
      
      <p class="signup-link">
        Don't have an account? <a href="/signUp">Sign up</a>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-form {
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

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
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
}

.submit-btn:hover:not(:disabled) {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #64748b;
}

.signup-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.signup-link a:hover {
  color: #2980b9;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
}
</style>

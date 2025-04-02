<template>
  <div class="contact">
    <h1>Contactez-nous</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="message" required></textarea>
      </div>
      <button type="submit">Envoyez</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    submitForm() {
      // S'occupe de l'envoie du formulaire (PAS FINI)
      console.log('Form submitted:', { email: this.email, message: this.message })
    }
  }
}
</script>
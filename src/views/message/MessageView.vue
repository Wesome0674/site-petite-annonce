<script>
export default {
  data() {
    return {
      conversations: [],
      idAnnonce: null,
      idReceveur: null,
      idEnvoyeur: null,
      activeConversation: null,
      newMessage: '',
    }
  },
  mounted() {
    this.idAnnonce = this.$route.query.annonceId
    this.idReceveur = this.$route.query.receveurId

    const userConnected = JSON.parse(localStorage.getItem('userConnected'))
    this.idEnvoyeur = userConnected ? userConnected.idUser : null

    console.log(this.idAnnonce)
    console.log(this.idReceveur)
    console.log(this.idEnvoyeur)

    this.getMessagesFromUser()
  },
  methods: {
    getMessagesFromUser() {
      fetch(
        `https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?messages&user=${this.idEnvoyeur}`,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Messages:', data)
          this.conversations = data
        })
        .catch((error) => {
          console.error('Error fetching messages:', error)
        })
    },
    selectConversation(conv) {
      this.activeConversation = conv
    },
    sendMessage() {
      if (this.newMessage.trim() && this.activeConversation) {
        const idAnnonce = this.idAnnonce
        const idEnvoyeur = this.idEnvoyeur
        const idDestinataire = this.idReceveur
        const contenu = this.newMessage

        this.sendMessageToDatabase(idAnnonce, idEnvoyeur, idDestinataire, contenu)
        if (!this.activeConversation.messages) {
          this.activeConversation.messages = []
        }
        this.activeConversation.messages.push({
          sender: 'me',
          contenu: this.newMessage,
          id: Date.now(),
        }) // Ajouter un id unique temporaire
        this.newMessage = ''
      }
    },
    sendMessageToDatabase(idAnnonce, idEnvoyeur, idDestinataire, contenu) {
      const messageData = {
        type: 'messages',
        idAnnonce: idAnnonce.toString(),
        idEnvoyeur: idEnvoyeur.toString(),
        idDestinataire: idDestinataire.toString(),
        contenu: contenu,
      }

      fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Message sent:', data)
        })
        .catch((error) => {
          console.error('Error sending message:', error)
        })
    },
    deleteMessage(messageId) {
      fetch(`https://demade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?message=${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('Message deleted:', data)
          const index = this.activeConversation.messages.findIndex((msg) => msg.id === messageId)
          if (index !== -1) {
            this.activeConversation.messages.splice(index, 1)
          }
        })
        .catch((error) => {
          console.error('Error deleting message:', error)
        })
    },
  },
}
</script>

<template>
  <div v-if="idAnnonce && idReceveur" class="flex flex-col h-screen bg-gray-100">
    <div class="w-full h-full bg-white shadow-md p-4 overflow-y-auto">
      <h2 class="text-lg font-semibold mb-4">Messages</h2>
      <div class="flex flex-col gap-2">
        <div
          v-for="(conv, index) in conversations"
          :key="index"
          @click="selectConversation(conv)"
          class="p-2 cursor-pointer hover:bg-gray-200 rounded"
        >
          <div :class="conv.idEnvoyeur === idEnvoyeur ? 'text-right' : 'text-left'">
            <span
              class="inline-block px-3 py-1 rounded-lg"
              :class="conv.idEnvoyeur === idEnvoyeur ? 'bg-blue-500 text-white' : 'bg-gray-300'"
            >
              {{ conv.contenu }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col">
      <div v-if="activeConversation" class="flex-1 flex flex-col bg-white shadow-md">
        <div class="p-4 border-b font-semibold">
          {{ activeConversation.name }}
        </div>

        <div class="flex-1 p-4 overflow-y-auto">
          <div
            v-for="(msg, index) in activeConversation.messages"
            :key="index"
            class="mb-2"
            :class="msg.sender === 'me' ? 'text-right' : 'text-left'"
          >
            <span
              class="inline-block px-3 py-1 rounded-lg"
              :class="msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300'"
            >
              {{ msg.contenu }}
            </span>
          </div>
        </div>

        <div class="p-4 border-t flex">
          <input
            type="text"
            v-model="newMessage"
            @keyup.enter="sendMessage"
            class="flex-1 p-2 border rounded-lg"
            placeholder="Écrire un message..."
          />
          <button @click="sendMessage" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Envoyer
          </button>
        </div>
      </div>
      <div v-else class="flex-1 flex items-center justify-center text-gray-500">
        Sélectionnez une conversation
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-screen">
    <p class="text-gray-500">No conversation selected</p>
  </div>
</template>

<style scoped>
.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.h-screen {
  height: 91vh;
}

.h-full {
  height: 100%;
}

.w-1\/3 {
  width: 33.333333%;
}

.w-2\/3 {
  width: 66.666667%;
}

.bg-white {
  background-color: white;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.shadow-md {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.p-4 {
  padding: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:bg-gray-200:hover {
  background-color: #e5e7eb;
}

.bg-gray-300 {
  background-color: #d1d5db;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.text-white {
  color: white;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.inline-block {
  display: inline-block;
}

.border-b {
  border-bottom: 1px solid #e5e7eb;
}

.border-t {
  border-top: 1px solid #e5e7eb;
}

.font-semibold {
  font-weight: 600;
}

.overflow-y-auto {
  overflow-y: auto;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.text-red-500 {
  color: #ef4444;
}

.hover\:text-red-700:hover {
  color: #b91c1c;
}

.text-gray-500 {
  color: #6b7280;
}

input {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  width: 100%;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
}

.text-lg {
  font-size: 1.125rem;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>

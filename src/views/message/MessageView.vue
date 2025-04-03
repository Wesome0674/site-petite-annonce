<script>
export default {
  data() {
    return {
      conversations: [],
      activeConversation: null,
      newMessage: '',
    }
  },
  mounted() {
    this.getMessagesFromUser()
  },
  methods: {
    getMessagesFromUser() {
      fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?messages&user=5')
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
        const idAnnonce = 1
        const idEnvoyeur = 5
        const idDestinataire = 1
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
      fetch(`https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?message=${messageId}`, {
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
  <div class="flex h-screen bg-gray-100">
    <div class="w-1/3 bg-white shadow-md p-4 overflow-y-auto">
      <h2 class="text-lg font-semibold mb-4">Messages</h2>
      <ul>
        <li
          v-for="(conv, index) in conversations"
          :key="index"
          @click="selectConversation(conv)"
          class="p-2 cursor-pointer border-b hover:bg-gray-200"
          :class="{ 'bg-gray-300': conv.id === activeConversation?.id }"
        >
          <strong>{{ conv.contenu }}</strong>
        </li>
      </ul>
    </div>

    <div class="w-2/3 flex flex-col">
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
            <button
              v-if="msg.sender === 'me'"
              @click="deleteMessage(msg.id)"
              class="ml-2 text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
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
</template>

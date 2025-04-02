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
          :class="{ 'bg-gray-300': conv.id === activeConversation?.id }">
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
            :class="msg.sender === 'me' ? 'text-right' : 'text-left'">
            <span class="inline-block px-3 py-1 rounded-lg"
              :class="msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300'">
              {{ msg.contenu }}
            </span>
          </div>
        </div>
        
        <div class="p-4 border-t flex">
          <input 
            type="text" v-model="newMessage" 
            @keyup.enter="sendMessage" 
            class="flex-1 p-2 border rounded-lg" 
            placeholder="Écrire un message...">
          <button @click="sendMessage" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Envoyer</button>
        </div>
      </div>
      <div v-else class="flex-1 flex items-center justify-center text-gray-500">Sélectionnez une conversation</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conversations: [],
      activeConversation: null,
      newMessage: ""
    };
  },
  mounted() {
    this.getMessagesFromUser();
  },
  methods: {
    getMessagesFromUser() {
      fetch('https://dnmade1.gobelinsannecy.fr/PetitesAnnonces/api/v1/?messages&user=5')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Messages:', data);
          this.conversations = data;
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    selectConversation(conv) {
      this.activeConversation = conv;
    },
    sendMessage() {
  if (this.newMessage.trim() && this.activeConversation) {
    // Vérifie si messages existe, sinon initialiser un tableau vide
    if (!this.activeConversation.messages) {
      this.activeConversation.messages = [];
    }
    
    // Ajouter le message
    this.activeConversation.messages.push({ sender: "me", contenu: this.newMessage });
    this.newMessage = "";  // Réinitialiser le champ de texte
  }
}

  }
};
</script>

<style>
body { font-family: Arial, sans-serif; }
</style>

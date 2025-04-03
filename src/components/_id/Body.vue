<script setup lang="ts">
import IconPrice from '../icons/IconPrice.vue'

defineProps<{
  annonceId: string
  receveurId: string
  title: string
  description: string
  prix: number
}>()
</script>

<template>
  <div class="annonce-body">
    <div class="left-part">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
      <p class="price">{{ prix }}.00 €</p>
    </div>
    <div class="right-part">
      <RouterLink
        :to="`/my-messages?receveurId=${receveurId}&annonceId=${annonceId}`"
        class="message-button"
      >
        <IconPrice />
        Envoyer un message
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.annonce-body {
  display: flex;
  width: 100%;
  padding: 24px 20px;
  align-items: start;
  justify-content: space-between;
  height: max-content;
}

.left-part {
  display: flex;
  width: 100%;
  gap: 24px;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.left-part p {
  color: var(--vt-c-black);
  font-size: var(--h1);
}

.title,
.price {
  font-weight: 600;
}

.right-part {
  display: flex;
  width: max-content;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.message-button {
  display: flex;
  width: max-content;
  padding: 12px 15px;
  border-radius: 10px;
  align-items: center;
  background-color: orangered;
  color: white;
  text-decoration: none;
  font-size: var(--h2);
  gap: 10px;
  font-weight: 600;
}
</style>

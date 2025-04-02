<script lang="ts">
import IconPrice from '../icons/IconPrice.vue'

export default {
  props: ['title', 'description', 'prix'],
}
</script>

<template>
  <div class="annonce-body">
    <div class="left-part">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
      <p class="price">{{ prix }}.00 €</p>
    </div>
    <RouterLink to="/message">
      <IconPrice />
      Envoyer un message
    </RouterLink>
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
</style>

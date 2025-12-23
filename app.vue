<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'BookYourSurf Admin',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'utf-8' },
    {
      name: 'description',
      content: 'Admin panel for BookYourSurf - Manage surf businesses, coaches, and services'
    },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})
</script>

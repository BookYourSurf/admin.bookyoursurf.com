<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar :title="$t('home.title')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-8">
        <div class="max-w-4xl mx-auto">
          <DashboardWelcome :title="$t('home.welcome')" :subtitle="$t('home.subtitle')" />

          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardFeatureCard
              v-for="feature in features"
              :key="feature.id"
              :icon="feature.icon"
              :icon-color="feature.iconColor"
              :title="feature.title"
              :description="feature.description"
            />
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const { features } = useDashboardFeatures()
</script>

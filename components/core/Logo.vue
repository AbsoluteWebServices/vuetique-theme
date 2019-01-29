<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline">
    <img
      class="logo hidden md:block"
      src="/assets/logo.svg"
      alt="Vuetique logo"
    >
    <img
      class="logo-text block md:hidden"
      src="/assets/logo_text.svg"
      alt="Vuetique"
    >
  </router-link>
</template>

<style lang="scss" scoped>
  .logo {
    height: 40px;
  }

  .logo-text {
    height: 20px;
  }
</style>

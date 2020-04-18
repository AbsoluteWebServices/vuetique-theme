<template>
  <button @click="$emit('click')" class="border-0 bg-transparent text-grey hover:text-grey-dark">
    <span class="hidden">
      {{ $t('Remove') }}
    </span>
    <svg viewBox="0 0 25 25" class="material-icons vt-icon--sm"><use xlink:href="#trash" /></svg>
  </button>
</template>

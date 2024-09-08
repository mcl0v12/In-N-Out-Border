<!-- app.vue -->

<template>
  <img class="absolute max-w-[12rem] top-6 left-6" src="@/assets/In-N-Out-Border-Logo.png" alt="Logo" />
  <div class="h-screen flex flex-center">
    <div ref="svgContainer">
      <PolygonContainer @update-svg="updateSvgMarkup" />
    </div>
  </div>
  <Clipboard :svgMarkup="svgMarkup" />
</template>

<script setup>
import { ref } from 'vue';
import PolygonContainer from './components/PolygonContainer.vue';
import Clipboard from './components/SVG-Clipboard.vue';

const svgMarkup = ref('');
const updateSvgMarkup = (newMarkup) => {
  svgMarkup.value = newMarkup;
};
</script>

<style scoped>
</style>

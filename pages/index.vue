<template>
    <img class="absolute max-w-[12rem] top-6 left-6" src="@/assets/In-N-Out-Border-Logo.png" alt="Logo" />
    <div class="h-screen flex flex-center">
        <PolygonContainer @update-svg="updateSvgMarkup" ref="svgContainer"/>
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
  
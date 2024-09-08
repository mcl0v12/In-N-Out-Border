<!-- PolygonDisplay.vue -->

<template>
  <div class="relative" :style="containerStyles">
    <svg
      :width="store.widthFactor"
      :height="store.heightFactor"
      :viewBox="'0 0 ' + store.widthFactor + ' ' + store.heightFactor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        :points="store.outerPolygonPoints"
        fill="none"
        stroke="black"
        :stroke-width="store.strokeWidthFactor"
      ></polygon>
      <polygon
        :points="store.innerPolygonPoints"
        fill="none"
        stroke="black"
        :stroke-width="store.strokeWidthFactor"
      ></polygon>

      <!-- ClipPath für das Div und das SVG -->
      <clipPath v-if="store.clipPathCreated" id="clip-0">
        <polygon :points="store.clipPathPolygonPoints" />
      </clipPath>
    </svg>

    <!-- Div mit Hintergrundfarbe und Clip-Path als Inline-Stile -->
    <div
      v-if="store.clipPathCreated"
      :style="{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: '#fb0017',
        clipPath: 'url(#clip-0)',
      }"
    ></div>
  </div>
</template>

<script setup>
import { usePolygonStore } from "~/store/polygonStore";
import { ref, onMounted, computed } from "vue";

const store = usePolygonStore();
const maxWidth = ref(0);
const maxHeight = ref(0);

// Funktion zum Aktualisieren der Größen
const updateMaxSizes = () => {
  if (typeof window !== "undefined") {
    maxWidth.value = window.innerWidth * .8;
    maxHeight.value = window.innerHeight * .8;
  }
};

// Computed styles für den skalierbaren Container
const containerStyles = computed(() => {
  const widthRatio = maxWidth.value / store.widthFactor;
  const heightRatio = maxHeight.value / store.heightFactor;
  const scale = Math.min(widthRatio, heightRatio);

  return {
    width: `${store.widthFactor}px`, // Container hat die Breite des SVGs
    height: `${store.heightFactor}px`, // Container hat die Höhe des SVGs
    position: "relative", // Relativer Container
    transform: `scale(${scale})`,
  };
});

onMounted(() => {
  updateMaxSizes();
  window.addEventListener("resize", updateMaxSizes);
});
</script>

<style scoped></style>

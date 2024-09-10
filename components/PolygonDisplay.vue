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
        fill="#fb0017"
        stroke="black"
        :stroke-width="store.strokeWidthFactor"
      ></polygon>
      <polygon
        :points="store.innerPolygonPoints"
        fill="none"
        stroke="black"
        :stroke-width="store.strokeWidthFactor"
      ></polygon>

      <clipPath v-if="store.clipPathCreated" id="clip-0">
        <polygon :points="store.clipPathPolygonPoints" />
      </clipPath>
    </svg>

    <div
      v-if="store.clipPathCreated"
      :style="{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: '#FFF',
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

const updateMaxSizes = () => {
  if (typeof window !== "undefined") {
    maxWidth.value = window.innerWidth * 0.7;
    maxHeight.value = window.innerHeight * 0.7;
  }
};

const containerStyles = computed(() => {
  const widthRatio = maxWidth.value / store.widthFactor;
  const heightRatio = maxHeight.value / store.heightFactor;
  const scale = Math.min(widthRatio, heightRatio);

  return {
    width: `${store.widthFactor}px`, 
    height: `${store.heightFactor}px`,
    position: "relative",
    transform: `scale(${scale})`,
  };
});

onMounted(() => {
  updateMaxSizes();
  window.addEventListener("resize", updateMaxSizes);
});
</script>

<style scoped></style>

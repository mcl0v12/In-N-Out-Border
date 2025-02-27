<template>
  <div>
    <Adjustments />
    <PolygonDisplay />
  </div>
</template>

<script setup>
import { usePolygonStore } from "~/store/polygonStore";
import { watch, computed, onMounted } from "vue";
import Adjustments from "./PolygonAdjustments.vue";
import PolygonDisplay from "./PolygonDisplay.vue";

const store = usePolygonStore();
const emit = defineEmits(["update-svg"]);

const svgMarkup = computed(() => {
  let containerDiv;

  if (store.useTailwindCSS) {
    containerDiv = `<div class="relative" style="width: ${store.widthFactor}px; height: ${store.heightFactor}px;">`;
  } else {
    containerDiv = `<div style="position: relative; width: ${store.widthFactor}px; height: ${store.heightFactor}px;">`;
  }

  let svgCode = `
      ${containerDiv}
        <svg width="${store.widthFactor}" height="${store.heightFactor}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${store.widthFactor} ${store.heightFactor}">
          <polygon points="${store.outerPolygonPoints}" fill="#fb0017" stroke="black" stroke-width="${store.strokeWidthFactor}" />
          <polygon points="${store.innerPolygonPoints}" fill="none" stroke="black" stroke-width="${store.strokeWidthFactor}" />`;

  if (store.clipPathCreated) {
    svgCode += `
          <defs>
            <clipPath id="clip-0">
              <polygon points="${store.clipPathPolygonPoints}" />
            </clipPath>
          </defs>`;
  }

  svgCode += `
        </svg>`;

  if (store.clipPathCreated) {
    if (store.useTailwindCSS) {
      svgCode += `
        <div class="w-full h-full absolute top-0 left-0" style="clip-path: url(#clip-0); background-color: #FFF;"></div>`;
    } else {
      svgCode += `
        <div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background-color: #FFF; clip-path: url(#clip-0);"></div>`;
    }
  }

  svgCode += `
      </div>`;

  return svgCode;
});

onMounted(() => {
  emit("update-svg", svgMarkup.value);
});

watch(
  () => [
    store.widthFactor,
    store.heightFactor,
    store.bluntnessFactor,
    store.spacingFactor,
    store.cornerSize,
    store.cornerInsetAngle,
    store.strokeWidthFactor,
    store.clipPathCreated,
    store.roundUpIntegers,
    store.decimalPlaces,
    store.useTailwindCSS // Beobachte die Tailwind-Einstellung
  ],
  () => {
    emit("update-svg", svgMarkup.value);
  }
);
</script>

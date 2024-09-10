<template>
  <div
    class="w-full max-w-[12rem] absolute top-[180px] left-6 bg-white flex flex-col gap-4 p-4 text-xs rounded-lg shadow-lg z-[2]"
  >
    <div class="flex flex-col gap-2">
      <label for="widthFactor">Width</label>
      <input
        type="range"
        id="widthFactor"
        v-model.number="store.widthFactor"
        min="200"
        max="2000"
        step="50"
      />
      <input type="number" v-model.number="store.widthFactor" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="heightFactor">Height</label>
      <input
        type="range"
        id="heightFactor"
        v-model.number="store.heightFactor"
        min="200"
        max="2000"
        step="50"
      />
      <input type="number" v-model.number="store.heightFactor" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="bluntnessFactor">Bluntness</label>
      <input
        type="range"
        id="bluntnessFactor"
        v-model.number="store.bluntnessFactor"
        min="0.1"
        max="3"
        step="0.1"
      />
      <input type="number" v-model.number="store.bluntnessFactor" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="cornerSize">Corner Size</label>
      <input
        type="range"
        id="cornerSize"
        v-model.number="store.cornerSize"
        min="0.1"
        max="3"
        step="0.1"
      />
      <input type="number" v-model.number="store.cornerSize" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="spacingFactor">Spacing</label>
      <input
        type="range"
        id="spacingFactor"
        v-model.number="store.spacingFactor"
        min="-1"
        max="3"
        step="0.1"
      />
      <input type="number" v-model.number="store.spacingFactor" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="strokeWidthFactor">Stroke Width</label>
      <input
        type="range"
        id="strokeWidthFactor"
        v-model.number="store.strokeWidthFactor"
        min="1"
        max="5"
        step="0.5"
      />
      <input type="number" v-model.number="store.strokeWidthFactor" />
    </div>

    <button @click="toggleClipPath">
      {{ store.clipPathCreated ? "Remove ClipPath" : "Create ClipPath" }}
    </button>

    <!--
            <div class="flex flex-col gap-2">
              <label for="cornerInsetAngle">Corner Inset Angle (degrees)</label>
              <input
                type="range"
                id="cornerInsetAngle"
                v-model.number="store.cornerInsetAngle"  
                min="0" 
                max="0.1" 
                step="0.01"
              />
              <input type="number" v-model.number="store.cornerInsetAngle" />
            </div>
 -->
  </div>
</template>

<script setup>
import { usePolygonStore } from "~/store/polygonStore";
const store = usePolygonStore();

const toggleClipPath = () => {
  if (store.clipPathCreated) {
    store.removeClipPath();
  } else {
    store.createClipPath();
  }
};
</script>

<style scoped></style>

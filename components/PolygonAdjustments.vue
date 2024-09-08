<!-- PolygonAdjustments.vue -->

<template>
  <div
    class="w-full max-w-[12rem] absolute top-[180px] left-6 bg-white flex flex-col gap-4 p-4 text-xs rounded-lg shadow-lg z-[2]"
  >
    <!-- Steuerung der Breite -->
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

    <!-- Steuerung der Höhe -->
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

        <!-- Steuerung der Eckenstumpfheit -->
        <div class="flex flex-col gap-2">
          <label for="bluntnessFactor">Bluntness</label>
          <input
            type="range"
            id="bluntnessFactor"
            v-model.number="store.bluntnessFactor"
            min="0"
            max="3"
            step="0.25"
          />
          <input type="number" v-model.number="store.bluntnessFactor" />
        </div>

    <!-- Neuer Schieberegler für Corner Size -->
    <div class="flex flex-col gap-2">
      <label for="cornerSize">Corner Size</label>
      <input
        type="range"
        id="cornerSize"
        v-model.number="store.cornerSize"
        min="0"
        max="3"
        step="0.1"
      />
      <input type="number" v-model.number="store.cornerSize" />
    </div>

    <!-- Steuerung des Abstands -->
    <div class="flex flex-col gap-2">
      <label for="spacingFactor">Spacing</label>
      <input
        type="range"
        id="spacingFactor"
        v-model.number="store.spacingFactor"
        min="-1"
        max="5"
        step="0.1"
      />
      <input type="number" v-model.number="store.spacingFactor" />
    </div>

    <!-- Steuerung der Stroke Width -->
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
    

    <!-- Dynamischer Button für ClipPath -->
    <button @click="toggleClipPath">
      {{ store.clipPathCreated ? "Remove ClipPath" : "Create ClipPath" }}
    </button>
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

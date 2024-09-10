<template>
  <div
    class="max-w-xs absolute bottom-6 right-6 bg-white p-4 text-xs rounded-lg shadow-lg"
  >
    <pre>{{ svgMarkup }}</pre>

    <div class="flex items-center mt-3">
      <button class="w-full copy-button mr-1" @click="copyToClipboard">
        Copy to Clipboard
      </button>
      <button class="settings-button flex flex-center" @click="toggleSettings">
        ⚙️
      </button>
    </div>


    <div v-if="showSettings" class="mt-3">

      
    <label class="flex items-center mb-2">
      <input type="checkbox" v-model="useTailwindCSS" class="mr-2" />
     Use TailwindCSS
    </label>

    
      <label class="flex items-center mb-2">
        <input type="checkbox" v-model="roundUpIntegers" class="mr-2" /> Round
        up Integers
      </label>

      <div v-if="roundUpIntegers" class="flex items-center mb-2">
        <label class="mr-2">Decimal Places:</label>
        <input
          type="number"
          v-model.number="decimalPlaces"
          min="3"
          class="w-20"
        />
      </div>

    </div>

    <div v-if="showToast" class="toast-message flex flex-center">Copied!</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePolygonStore } from "~/store/polygonStore"; 

const props = defineProps({
  svgMarkup: String,
});

const store = usePolygonStore(); 

const showToast = ref(false);
const showSettings = ref(false);
const roundUpIntegers = ref(false);
const decimalPlaces = ref(5); 
const useTailwindCSS = ref(false);


watch(
  [roundUpIntegers, decimalPlaces, useTailwindCSS],
  ([newRoundUpIntegers, newDecimalPlaces, newUseTailwindCSS]) => {
    store.updateFactors(
      store.widthFactor,
      store.heightFactor,
      store.bluntnessFactor, 
      store.cornerInsetAngle,
      store.cornerSize, 
      store.spacingFactor,
      store.strokeWidthFactor,
      newDecimalPlaces, 
      newRoundUpIntegers, 
      newUseTailwindCSS
    );
  }
);


const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.svgMarkup);

    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};
</script>

<style scoped>
pre {
  white-space: normal;
  word-wrap: break-word;
  margin: 0;
}

.copy-button {
  height: 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 12px;
}

.copy-button:hover {
  background-color: #0056b3;
}

.settings-button {
  height: 25px;
  background-color: #e6e6e6;
  color: black;
  border: none;
  border-radius: 3px;
  font-size: 12px;
}

.settings-button:hover {
  background-color: #cccccc;
}

.toast-message {
  height: 25px;
  background-color: #28a745;
  color: white;
  border-radius: 3px;
  font-size: 12px;
  margin-top: 10px;
  animation: fade-in-out 2s ease;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>

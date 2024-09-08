<!-- SVG-Clipboard.vue -->

<template>
  <div
    class="max-w-xs absolute bottom-6 right-6 bg-white p-4 text-xs rounded-lg shadow-lg"
  >
    <pre>{{ svgMarkup }}</pre>
    <button @click="copyToClipboard">Copy to Clipboard</button>

    <div v-if="showToast" class="toast-message">Copied!</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  svgMarkup: String,
});

const showToast = ref(false);

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
</script>

<style scoped>
pre {
  white-space: normal;
  word-wrap: break-word;
  margin: 0;
}

button {
  margin-top: 10px;
  width: 100%;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.toast-message {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
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

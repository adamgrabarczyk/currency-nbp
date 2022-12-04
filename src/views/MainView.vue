<template>
  <main-component />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import MainComponent from "../components/MainComponent.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    MainComponent,
  },
});
</script>

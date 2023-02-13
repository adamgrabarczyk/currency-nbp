<template>
  <app-component />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import AppComponent from "../components/AppComponent.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    AppComponent,
  },
});
</script>

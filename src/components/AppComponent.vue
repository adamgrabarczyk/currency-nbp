<template>
  <div class="container">
    <div v-if="err" class="error">{{ err }}</div>
    <Suspense v-else>
      <template #default>
        <MainComponent />
      </template>
      <template #fallback>
        <AppLoader />
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, onErrorCaptured } from "vue";
import MainComponent from "@/components/MainComponent";
import AppLoader from "@/components/AppLoader";
export default {
  name: "AppComponent",
  components: { MainComponent, AppLoader },
  setup() {
    const err = ref(null);
    onErrorCaptured((e) => {
      err.value = "Wystąpił błąd";
      return true;
    });
    return { err };
  },
};
</script>

<style scoped>
.container {
  height: 90%;
}
</style>

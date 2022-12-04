<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :color="isHovering ? 'primary' : undefined"
        title="Hover over me"
        text="..."
      ></v-card>
    </template>
  </v-hover>
</template>
<script>
export default {
  name: "SearchSort",
};
</script>

<style scoped></style>

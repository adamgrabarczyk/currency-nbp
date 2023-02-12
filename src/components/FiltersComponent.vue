<template>
  <div class="pa-4">
    <v-chip
      @click="sortByName"
      class="filterButton"
      :class="{ text: isActive === true }"
    >
      Filtruj po nazwie
    </v-chip>
    <v-chip
      @click="sortByValue"
      class="filterButton"
      :class="{ text: active === true }"
    >
      Filtruj po cenie (od najmniejszej)
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "FiltersComponent",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["sort-by-value", "sort-by-name"],
  setup(props, { emit }) {
    const sortByValue = () => {
      emit("sort-by-value");
    };

    const sortByName = () => {
      emit("sort-by-name");
    };
    return {
      sortByName,
      sortByValue,
    };
  },
};
</script>

<style scoped></style>

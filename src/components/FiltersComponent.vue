<template>
  <div class="pa-4">
    <FilterButton
      @sort="sortByName"
      :status="{ text: isActive === true }"
      :filter-name="`Filtruj po nazwie`"
    />
    <FilterButton
      @sort="sortByValue"
      :status="{ text: active === true }"
      :filter-name="`Filtruj po cenie (od najmniejszej)`"
    />
  </div>
</template>

<script>
import FilterButton from "@/components/FilterButton";
export default {
  name: "FiltersComponent",
  components: { FilterButton },
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

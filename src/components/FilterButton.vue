<template>
  <v-chip @click="sort" class="filterButton" :class="$props.status">
    {{ $props.filterName }}
  </v-chip>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    filterName: {
      type: String,
      default: "",
    },
    status: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const sort = () => {
      emit("sort");
    };
    return {
      sort,
    };
  },
};
</script>

<style scoped></style>

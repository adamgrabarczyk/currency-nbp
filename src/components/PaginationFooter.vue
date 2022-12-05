<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="6"></v-pagination>
  </div>
</template>

<script>
let b;
export default {
  name: "PaginationFooter",
  props: b,

  data() {
    return {
      page: b,
    };
  },
};
</script>

<template>
  <v-table height="450px">
    <thead>
      <tr>
        <th class="text-left">Waluta</th>
        <th class="text-left">Cena w przeliczeniu na 1 zł</th>
      </tr>
    </thead>
    <tbody v-if="$props.arr.length > 0">
      <tr v-for="item in $props.arr" :key="item.code">
        <td>{{ item.currency }}</td>
        <td>{{ item.mid }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td class="no-results" colspan="2">Brak wyników</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: "CurrencyList",
  props: {
    arr: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>

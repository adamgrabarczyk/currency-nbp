<template>
  <search-sort />
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Currency name</th>
        <th class="text-left">Calories</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in currentArray" :key="item.code">
        <td>{{ item.currency }}</td>
        <td>{{ item.mid }}</td>
      </tr>
    </tbody>
  </v-table>
  <PaginationFooter />
</template>
<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import SearchSort from "@/components/SearchSort";
import PaginationFooter from "@/components/PaginationFooter";

const Api = "http://api.nbp.pl/api/exchangerates/tables/b";
export default {
  components: { PaginationFooter, SearchSort },
  setup() {
    const data = ref(null);
    const currentArray = ref(null);
    const currentPage = ref(1);
    const getData = () => {
      axios
        .get(Api)
        .then((response) => {
          data.value = [];
          const chunkSize = 10;
          const dataArr = response.data[0].rates;
          for (let i = 0; i < dataArr.length; i += chunkSize) {
            const chunk = dataArr.slice(i, i + chunkSize);
            console.log(chunk);
            data.value.push(chunk);
          }
          console.log(data.value);
          console.log(currentPage.value);
          currentArray.value = data.value[0];
          console.log(currentArray.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(async () => {
      await getData();
    });

    return { data, currentArray };
  },
};
</script>

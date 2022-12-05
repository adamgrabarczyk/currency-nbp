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
  <div class="text-center">
    <v-pagination
      v-model="currentPage"
      :length="12"
      @update:modelValue="pageChange"
    ></v-pagination>
  </div>
  <div v-on:click="log"><p>blah</p></div>
</template>
<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import SearchSort from "@/components/SearchSort";
// import PaginationFooter from "@/components/PaginationFooter";

const Api = "https://api.nbp.pl/api/exchangerates/tables/b";
export default {
  components: { SearchSort },
  setup() {
    const data = ref(null);
    const currentPage = ref(1);
    const currentArray = ref(null);

    const log = () => {
      console.log(currentPage.value);
      console.log(currentArray.value);
    };

    const pageChange = () => {
      console.log(currentPage.value);
      currentArray.value = data.value[currentPage.value - 1];
    };

    if (currentPage.value == 2) {
      alert("ble");
    }

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

    return { data, currentArray, currentPage, log, pageChange };
  },
};
</script>

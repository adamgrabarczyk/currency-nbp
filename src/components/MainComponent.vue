<template>
  <search-sort />

  <div class="pa-4">
    <v-chip v-if="isActive" v-on:click="sortByName" class="text">
      Filtruj po nazwie
    </v-chip>
    <v-chip v-else v-on:click="sortByName"> Filtruj po nazwie </v-chip>
    <v-chip v-if="active" v-on:click="sortByValue" class="text">
      Filtruj po cenie (od najmniejszej)
    </v-chip>
    <v-chip v-else v-on:click="sortByValue">
      Filtruj po cenie (od najmniejszej)
    </v-chip>
  </div>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">Waluta</th>
        <th class="text-left">Cena w przeliczeniu na 1 zł</th>
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
    const active = ref(false);
    const isActive = ref(false);

    const log = () => {
      console.log(active.value);
      console.log(currentPage.value);
      console.log(currentArray.value);
      console.log(data.value[currentPage.value - 1]);
    };

    const pageChange = () => {
      console.log(currentPage.value);
      let copyArr = data.value[currentPage.value - 1].slice();
      if (active.value) {
        const sorted = copyArr.sort(function (a, b) {
          if (a.mid < b.mid) {
            return -1;
          }
          if (a.mid > b.mid) {
            return 1;
          }
          return 0;
        });
        currentArray.value = sorted;
      } else {
        currentArray.value = copyArr;
      }
    };

    const sortByName = () => {
      const sorted = currentArray.value.sort(function (a, b) {
        if (a.currency < b.currency) {
          return -1;
        }
        if (a.currency > b.currency) {
          return 1;
        }
        return 0;
      });
      console.log(sorted);
      active.value = false;
      isActive.value = !isActive.value;
    };

    const sortByValue = () => {
      let table = currentArray.value.slice();
      if (active.value === false) {
        const sorted = table.sort(function (a, b) {
          if (a.mid < b.mid) {
            return -1;
          }
          if (a.mid > b.mid) {
            return 1;
          }
          return 0;
        });
        currentArray.value = sorted;
      } else {
        currentArray.value = data.value[currentPage.value - 1];
      }
      isActive.value = false;
      active.value = !active.value;
    };
    const getData = () => {
      axios
        .get(Api)
        .then((response) => {
          data.value = [];
          const chunkSize = 10;
          const dataArr = response.data[0].rates;
          for (let i = 0; i < dataArr.length; i += chunkSize) {
            const chunk = dataArr.slice(i, i + chunkSize);
            data.value.push(chunk);
          }
          currentArray.value = data.value[0];
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(async () => {
      await getData();
    });

    return {
      data,
      currentArray,
      currentPage,
      log,
      pageChange,
      sortByName,
      sortByValue,
      active,
      isActive,
    };
  },
};
</script>

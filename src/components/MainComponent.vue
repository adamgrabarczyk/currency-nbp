<template>
  <search-sort />
  <div>
    <v-text-field label="Main input" hide-details="auto"></v-text-field>
    <v-text-field label="Another input"></v-text-field>
    <v-text-field
      v-model="searchPhrase"
      @input="handleInput"
      @click:clear="clearSearchPhrase"
      clearable
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Szukaj"
    ></v-text-field>
  </div>
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
    const protectedCurrentArray = ref(null);
    const active = ref(false);
    const isActive = ref(false);
    const searchPhrase = ref("");

    const log = () => {
      console.log(sort(currentArray.value));
      console.log(active.value);
      console.log(isActive.value);
      // console.log(currentPage.value);
      // console.log(currentArray.value);
      // console.log(data.value[currentPage.value - 1]);
    };

    const clearSearchPhrase = () => {
      currentArray.value = protectedCurrentArray.value;
    };

    const handleInput = () => {
      let copyArr = protectedCurrentArray.value.slice();
      const searchValue = copyArr.filter((item) =>
        item.currency
          .toLocaleLowerCase()
          .includes(searchPhrase.value.toLocaleLowerCase())
      );
      console.log(searchValue);
      currentArray.value = searchValue;
    };

    const sort = (arr, func) => {
      const sorted = arr.sort((a, b) => {
        if (func === "value" ? a.mid < b.mid : a.currency < b.currency) {
          return -1;
        }
        if (func === "value" ? a.mid > b.mid : a.currency < b.currency) {
          return 1;
        }
        return 0;
      });
      return sorted;
    };

    const pageChange = () => {
      console.log(currentPage.value);
      let copyArr = data.value[currentPage.value - 1].slice();
      if (active.value) {
        const sorted = sort(copyArr, "value");
        currentArray.value = sorted;
        protectedCurrentArray.value = sorted;
      } else {
        currentArray.value = copyArr;
        protectedCurrentArray.value = copyArr;
      }
      searchPhrase.value = "";
    };

    const sortByName = () => {
      sort(currentArray.value);
      sort(protectedCurrentArray.value);
      active.value = false;
      isActive.value = !isActive.value;
    };

    const sortByValue = () => {
      let table = currentArray.value.slice();
      if (active.value === false) {
        const sorted = sort(table, "value");
        currentArray.value = sorted;
        protectedCurrentArray.value = sorted;
      } else {
        currentArray.value = data.value[currentPage.value - 1];
        protectedCurrentArray.value = data.value[currentPage.value - 1];
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
      searchPhrase,
      handleInput,
      clearSearchPhrase,
    };
  },
};
</script>

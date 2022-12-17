<template>
  <div class="container">
    <search-sort />
    <div>
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
  </div>
</template>
<script>
import SearchSort from "@/components/SearchSort";
import { useData } from "@/composables/useData";

export default {
  components: { SearchSort },
  setup() {
    const {
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
      arrL,
    } = useData();

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
      arrL,
    };
  },
};
</script>

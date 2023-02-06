<template>
  <div class="container">
    <ImageWrapper />
    <h1 class="header-text">
      Aktualny kursu walut - API Narodowego Banku Polskiego
    </h1>
    <search-bar
      v-model="searchPhrase"
      @input="handleInput"
      @click:clear="clearSearchPhrase"
    />
    <div class="pa-4">
      <v-chip
        v-on:click="sortByName"
        class="filterButton"
        :class="{ text: isActive === true }"
      >
        Filtruj po nazwie
      </v-chip>
      <v-chip
        v-on:click="sortByValue"
        class="filterButton"
        :class="{ text: active === true }"
      >
        Filtruj po cenie (od najmniejszej)
      </v-chip>
    </div>

    <v-table height="450px">
      <thead>
        <tr>
          <th class="text-left">Waluta</th>
          <th class="text-left">Cena w przeliczeniu na 1 zł</th>
        </tr>
      </thead>
      <tbody v-if="currentArray.length > 0">
        <tr v-for="item in currentArray" :key="item.code">
          <td>{{ item.currency }}</td>
          <td>{{ item.mid }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="no-results" colspan="2">Brak wyników wyszykiwania</td>
        </tr>
      </tbody>
    </v-table>
    <div>
      <PaginationFooter v-model="currentPage" @update:modelValue="pageChange" />
    </div>
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import { useData } from "@/composables/useData";
import PaginationFooter from "@/components/PaginationFooter";
import ImageWrapper from "@/components/ImageWrapper";

export default {
  components: { ImageWrapper, PaginationFooter, SearchBar },
  setup() {
    const {
      currentArray,
      currentPage,
      pageChange,
      sortByName,
      sortByValue,
      active,
      isActive,
      searchPhrase,
      handleInput,
      clearSearchPhrase,
    } = useData();

    return {
      currentArray,
      currentPage,
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

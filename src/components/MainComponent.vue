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
    <FiltersComponent
      @sort-by-value="sortByValue"
      @sort-by-name="sortByName"
      :active="active"
      :is-active="isActive"
    />
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
    <div class="text-center">
      <PaginationFooter v-model="currentPage" @update:modelValue="pageChange" />
    </div>
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import { useData } from "@/composables/useData";
import PaginationFooter from "@/components/PaginationFooter";
import ImageWrapper from "@/components/ImageWrapper";
import FiltersComponent from "@/components/FiltersComponent";

export default {
  components: { FiltersComponent, ImageWrapper, PaginationFooter, SearchBar },
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

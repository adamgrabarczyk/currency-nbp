<template>
  <div class="container">
    <ImageWrapper />
    <h1 class="header-text">
      Aktualny kursu walut - API Narodowego Banku Polskiego
    </h1>
    <search-bar v-model="searchPhrase" @click:clear="clearSearchPhrase" />
    <FiltersComponent
      @sort-by-value="sortByValue"
      @sort-by-name="sortByName"
      :active="active"
      :is-active="isActive"
    />
    <CurrencyList :arr="currentArray" />
    <PaginationFooter v-model="currentPage" />
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import { useData } from "@/composables/useData";
import PaginationFooter from "@/components/PaginationFooter";
import ImageWrapper from "@/components/ImageWrapper";
import FiltersComponent from "@/components/FiltersComponent";
import CurrencyList from "@/components/CurrencyList";
import { baseApiUrl } from "../../utils/api";

export default {
  components: {
    CurrencyList,
    FiltersComponent,
    ImageWrapper,
    PaginationFooter,
    SearchBar,
  },
  async setup() {
    const {
      promise,
      currentArray,
      currentPage,
      sortByName,
      sortByValue,
      active,
      isActive,
      searchPhrase,
      clearSearchPhrase,
    } = useData();

    await promise;
    const response = await fetch(baseApiUrl);

    return {
      currentArray,
      currentPage,
      sortByName,
      sortByValue,
      active,
      isActive,
      searchPhrase,
      clearSearchPhrase,
    };
  },
};
</script>

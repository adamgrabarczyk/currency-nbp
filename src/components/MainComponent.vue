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
    <CurrencyList :arr="currentArray" />
    <PaginationFooter v-model="currentPage" @update:modelValue="pageChange" />
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar";
import { useData } from "@/composables/useData";
import PaginationFooter from "@/components/PaginationFooter";
import ImageWrapper from "@/components/ImageWrapper";
import FiltersComponent from "@/components/FiltersComponent";
import CurrencyList from "@/components/CurrencyList";

export default {
  components: {
    CurrencyList,
    FiltersComponent,
    ImageWrapper,
    PaginationFooter,
    SearchBar,
  },
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

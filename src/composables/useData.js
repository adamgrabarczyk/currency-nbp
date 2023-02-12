import { onBeforeMount, ref, watch } from "vue";
import axios from "axios";
import { baseApiUrl } from "../../utils/api";

export function useData() {
  const Api = baseApiUrl;
  const data = ref(null);
  const currentPage = ref(1);
  const currentArray = ref([]);
  const currentArrayWithPhrase = ref(null);
  const protectedCurrentArray = ref(null);
  const active = ref(false);
  const isActive = ref(false);
  const searchPhrase = ref("");

  const clearSearchPhrase = () => {
    const copyArr = protectedCurrentArray.value;
    if (active.value) {
      const sorted = sort(copyArr, "value");
      currentArray.value = sorted;
      protectedCurrentArray.value = sorted;
    } else {
      currentArray.value = copyArr;
    }
    currentArrayWithPhrase.value = [];
    searchPhrase.value = "";
  };

  const handleInput = () => {
    const copyArr = protectedCurrentArray.value;
    const searchValue = copyArr.filter((item) =>
      item.currency
        .toLocaleLowerCase()
        .includes(searchPhrase.value.toLocaleLowerCase())
    );
    if (searchPhrase.value.length > 2) {
      currentArray.value = searchValue;
      currentArrayWithPhrase.value = searchValue;
    } else if (searchPhrase.value.length < 3) {
      currentArray.value = protectedCurrentArray.value;
      currentArrayWithPhrase.value = protectedCurrentArray.value;
    }
  };

  const sort = (arr, func) => {
    const sorted = arr.sort((a, b) => {
      if (
        func === "value"
          ? a.mid < b.mid
          : a.currency.toLowerCase() < b.currency.toLowerCase()
      ) {
        return -1;
      }
      if (
        func === "value"
          ? a.mid > b.mid
          : a.currency.toLowerCase() < b.currency.toLowerCase()
      ) {
        return 1;
      }
      return 0;
    });
    return sorted;
  };
  const sortByName = () => {
    sort(currentArray.value);
    sort(protectedCurrentArray.value);
    active.value = false;
    isActive.value = !isActive.value;
  };

  const sortByValue = () => {
    const table = [...currentArray.value];
    if (active.value === false) {
      const sorted = sort(table, "value");
      currentArray.value = sorted;
    } else if (active.value) {
      const sorted = sort(table, "");
      currentArray.value = sorted;
    } else if (searchPhrase.value != "") {
      const table = [...currentArrayWithPhrase.value];
      const sorted = sort(table, "");
      currentArray.value = sorted;
    } else {
      currentArray.value = data.value[currentPage.value - 1];
    }
    isActive.value = false;
    active.value = !active.value;
  };

  watch(currentPage, (newValue) => {
    protectedCurrentArray.value = data.value[newValue - 1];
    if (active.value) {
      currentArray.value = sort(protectedCurrentArray.value, "value");
    } else {
      currentArray.value = protectedCurrentArray.value;
    }
    searchPhrase.value = "";
  });

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
        protectedCurrentArray.value = data.value[0];
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onBeforeMount(async () => {
    await getData();
  });

  return {
    data,
    currentArray,
    currentPage,
    sortByName,
    sortByValue,
    active,
    isActive,
    searchPhrase,
    handleInput,
    clearSearchPhrase,
  };
}

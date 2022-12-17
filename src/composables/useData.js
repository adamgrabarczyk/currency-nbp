import { onBeforeMount, ref } from "vue";
import axios from "axios";

export function useData() {
  const Api = "https://api.nbp.pl/api/exchangerates/tables/b";
  const data = ref(null);
  const currentPage = ref(1);
  const currentArray = ref(null);
  const currentArrayWithPhrase = ref(null);
  const protectedCurrentArray = ref(null);
  const active = ref(false);
  const isActive = ref(false);
  const searchPhrase = ref("");

  const log = () => {
    console.log(sort(currentArray.value));
    console.log(active.value);
    console.log(isActive.value);
  };

  const clearSearchPhrase = () => {
    currentArray.value = protectedCurrentArray.value;
  };

  const handleInput = () => {
    const copyArr = protectedCurrentArray.value.slice();
    const searchValue = copyArr.filter((item) =>
      item.currency
        .toLocaleLowerCase()
        .includes(searchPhrase.value.toLocaleLowerCase())
    );
    console.log(searchValue);
    if (searchPhrase.value.length > 2) {
      currentArray.value = searchValue;
      currentArrayWithPhrase.value = searchValue;
    } else if (searchPhrase.value.length < 3) {
      currentArray.value = protectedCurrentArray.value;
      currentArrayWithPhrase.value = protectedCurrentArray.value;
    }
  };

  const arrL = () => {
    if (currentArray.value.lenght > 0) {
      return true;
    } else {
      return false;
    }
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
    const copyArr = data.value[currentPage.value - 1].slice();
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
    const table = [...currentArray.value.slice()];
    if (active.value === false) {
      const sorted = sort(table, "value");
      currentArray.value = sorted;
    } else if (searchPhrase.value != "") {
      const table = [...currentArrayWithPhrase.value.slice()];
      const sorted = sort(table, "");
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
}

<template>
  <search-sort />
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="My Files"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>
<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import SearchSort from "@/components/SearchSort";

const Api = "http://api.nbp.pl/api/exchangerates/tables/b";
export default {
  components: { SearchSort },

  setup() {
    const data = ref(null);
    const getData = () => {
      axios
        .get(Api)
        .then((response) => {
          data.value = response.data[0].rates;
          console.log(data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(async () => {
      await getData();
    });

    return { data };
  },
};
</script>

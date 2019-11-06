<template>
  <v-app>
    <v-app-bar dark app color="blue darken-4">
      <v-toolbar-title class="headline text-uppercase">
        <span>Cara</span>
        <span class="font-weight-light">Crachá</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">{{this.session}}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <ViewPorteiro
        v-if="this.session=== 'porteiro'"
        
        :apartamentos="apartamentos"
      />
      <ViewSindico
        v-if="this.session=== 'sindico'"
        
        :apartamentos="apartamentos"
      />
    </v-content>
  </v-app>
</template>

<script>
import bancoDados from "@/firebase/init";
import ViewPorteiro from "./components/porteiro/ViewPorteiro";
import ViewSindico from "./components/sindico/ViewSindico";
export default {
  name: "App",
  components: {
    ViewPorteiro,
    ViewSindico
  },
  data() {
    return {
      session: "porteiro",
      apartamentos: []
    };
  }
 
};
</script>

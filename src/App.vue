<template>
  <v-app>
    <!-- <v-app-bar dark app color="#0f3252">
      <v-toolbar-title class="headline text-uppercase">
        <span>Cara</span>
    <span class="font-weight-light">Crachá</span>-->
    <!-- <v-img src="@/assets/logo_ivia_intranet.png"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">{{this.session}}</span>
      </v-btn>
    </v-app-bar>-->

    <v-content>
      <ViewPorteiro v-if="this.session=== 'porteiro'" :session="session" />
      <ViewSindico v-if="this.session=== 'sindico'" :session="session" />
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
      apartamentos: [],
      items: [
        { title: "Cadastrar Morador", icon: "mdi-plus" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      right: null
    };
  }
};
</script>

<template>
  <v-app>
    

    <v-content>
      <TelaLogin v-if="this.session === null"/>
      <ViewPorteiro v-if="this.session=== 'porteiro'" :session="session" />
      <ViewSindico v-if="this.session=== 'sindico'" :session="session" />
    </v-content>
  </v-app>
</template>

<script>
import bancoDados from "@/firebase/init";
import ViewPorteiro from "./components/porteiro/ViewPorteiro";
import ViewSindico from "./components/sindico/ViewSindico";
import TelaLogin from "./components/TelaLogin";
export default {
  name: "App",
  components: {
    ViewPorteiro,
    ViewSindico,
    TelaLogin
  },
  data() {
    return {
      session: 'sindico',
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

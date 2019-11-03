<template>
  <v-app>
    <v-app-bar app color="blue darken-4">
      <v-toolbar-title class="headline text-uppercase">
        <span>Cara</span>
        <span class="font-weight-light">Crachá</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="mr-2">Tipo de usuáruio</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <ViewPorteiro :moradores="moradores" :apartamentos="apartamentos" />
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
      moradores: []
    };
  },
  created() {
    //chamada de apartamentos
    bancoDados
      .collection("apartamentos")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let apto = doc.id;
          this.apartamentos.push(apto);
        });
      }),
      //chamada de moradores
      bancoDados
        .collection("morador")
        .get()
        .then(snapshot => {
          snapshot.forEach(liver => {
            let condomino = liver.data();
            condomino.id = liver.id;
            this.moradores.push(condomino);
          });
        });
  }
};
</script>

<template>
  <div>
    <div class="header">
      <!-- Titulo da página -->
      <v-toolbar>
        <v-spacer></v-spacer>
        <span class="headline text-uppercase">Lista de Andares</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <!-- Renderizando os botoes de andares -->
    </div>
    <v-row align="center">
      <v-col v-for="andar in apartamentos" :key="andar.num" class="text-center" cols="3">
        <v-row justify="center">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">{{andar}}</v-btn>
          </template>
          <!-- código do card -->
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import bancoDados from "@/firebase/init";
export default {
  name: "ViewPorteiro",
  props: ["apartamentos"],
  data() {
    return {
      dialog: false,
      moradores: []
    };
  }
};
</script>

<style>
</style>
<template>
  <v-navigation-drawer permanent dark app color="#0f3252">
    <v-spacer></v-spacer>

    <v-img src="@/assets/fundo.png">
      <v-list-item>
        <v-list-item-content>
          <v-img src="@/assets/cara-cracha.png" contain=""></v-img>
        </v-list-item-content>
      </v-list-item>
    </v-img>

    <v-divider></v-divider>

    <v-img src="@/assets/predio-menu-lateral.png"  height="850px"></v-img>
  </v-navigation-drawer>
</template>

<script>
import firebase from "firebase";
import bancoDados from "@/firebase/init";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    nome: "",
    sobrenome: "",
    andar: "",
    sexo: "",
    tipo: "",
    foto: "",
    moradores: [],
    selectedFile: null,
    pessoaId: null
  }),
  
};
</script>

<style>
</style>
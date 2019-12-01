<template>
  <div class="header">
    <MenuLateral />
    <v-toolbar>
      <span class="headline font-weight-regular">Lista de Moradores</span>
      
    </v-toolbar>
    <!-- MOSTRUARIO DE MORADORES  -->
    <div>
      <!-- <div class="cards" v-for="individuos in moradores" :key="individuos.id"> -->
      <v-row>
        <v-col v-for="individuos in moradores" :key="individuos.id" cols="2">
          <v-card class="ma-2" width="170">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img
                v-if="individuos.foto"
                :src="individuos.foto"
              ></v-img>
            </v-avatar>
            <v-card-title class="headline">
              {{individuos.nome}}
              <br />
              {{individuos.sobrenome}}
            </v-card-title>

            <v-card-text>
              <div>
                <v-chip>
                  <span>{{individuos.tipo}}</span>
                </v-chip>
              </div>
              <div>
                <strong>{{individuos.sexo}}</strong>
              </div>
              <div>
                <strong>{{individuos.apartamento}}</strong>
              </div>
            </v-card-text>
            <v-card-actions>
              <!-- BOTÕES DO CARD -->

              <!-- BOTÃO DE DELETAR -->
              <v-dialog v-model="dialogDelete" persistent max-width="320">
                <template v-slot:activator="{on : dialogDelete}">
                  <v-tooltip bottom>
                  <template v-slot:activator="{on : tooltip}">
                  <v-btn
                    v-if="session === 'sindico'"
                    @click="check(individuos)"
                    small
                    darken
                    color="danger"
                    v-on="{...dialogDelete, ...tooltip}"
                  >
                    <v-icon >mdi-delete</v-icon>
                  </v-btn>
                  </template>
                  <span>Deletar Morador</span>
                  </v-tooltip>
                </template>
                <v-card>
                  <v-card-title class="headline">Tem certeza que deseja excluir esse morador?</v-card-title>
                  <v-card-text>Depois de excluído, esse morador desaparecerá dos registros e não aparecerá novamente</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="danger" text @click="dialogDelete = false">cancelar</v-btn>
                    <v-btn color="red" text @click="deletarMorador(individuos)">Deletar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <!-- BOTÃO DE EDITAR MORADOR -->
              <EditButton />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!-- <ViewPorteiro /> -->
  </div>
  <!-- </div> -->
</template>

<script>
import EditButton from "./EditButton";
import MenuLateral from "./MenuLateral";
import ViewPorteiro from "../porteiro/ViewPorteiro";
import bancoDados from "@/firebase/init";
import axios from "axios";
import firebase from "firebase";
export default {
  components: { ViewPorteiro, MenuLateral, EditButton },
  props: ["session"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    nome: "",
    sobrenome: "",
    andar: "",
    sexo: "",
    tipo: "",
    foto: null,
    moradores: [],
    selectedFile: null,
    pessoaId: null
  }),
  created() {
    bancoDados
      .collection("morador")
      .get()
      .then(snapshot => {
        snapshot.forEach(liver => {
          let morador = liver.data();
          morador.id = liver.id;
          this.moradores.push(morador);
        });
      });
  },
  methods: {
    // onUpload(){
    //   const fd = new FormData();
    //   fd.append('image',this.selectedFile, this.selectedFile.name)
    //   axios.post('https://us-central1-appcara-cracha.cloudfunctions.net/uploadFile ', fd)
    //     .then(res =>{
    //       console.log(res);
    //     })
    // },
    deletarMorador() {
      this.dialogDelete = false;
      console.log(this.pessoaId);
      bancoDados
        .collection("morador")
        .doc(this.pessoaId)
        .delete()
        .then(function() {
          console.log("O morador foi removido!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
          this.pessoaId = null;
        });
    },
    check(morador) {
      console.log(morador.id);
      this.pessoaId = morador.id;
    }
  }
};
</script>

<style>
</style>
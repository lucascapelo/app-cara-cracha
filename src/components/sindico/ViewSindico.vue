<template>
  <div class="header">
    <MenuLateral />
    <v-toolbar>
      <span class="headline font-weight-regular">Lista de Moradores</span>
      <v-spacer></v-spacer>
      <!-- BOTÃO DE CADASTRO -->
      <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on:dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on:tooltip }">
            <v-btn fab color="#7596cc" v-on="{...tooltip,...dialog}">
              <v-icon color="white">mdi-plus</v-icon>
            </v-btn>
              </template>
              <span>Adicionar Morador</span>
            </v-tooltip>  
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Cadastro de Morador</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field label="Nome*" v-model="nome" required hint="Ex.: Lucas"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Sobrenome*"
                        v-model="sobrenome"
                        required
                        hint="Ex.: Capelo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Andar*" v-model="andar" required hint="Ex.:1302"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="['Masculino', 'Feminino']"
                        v-model="sexo"
                        label="Sexo*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="['Morador', 'Agregado']"
                        v-model="tipo"
                        label="Tipo*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <span>Foto:</span>
                      <v-spacer></v-spacer>
                      <v-btn small>
                        <input type="file" @change="OnFileSelected" />
                        <v-icon>mdi-upload</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <small>
                <p class="red-text">*Campo Obrigatório</p>
              </small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="danger" text @click="ClearForm">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="cadastrar">Cadastrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>  
    <!-- MOSTRUARIO DE MORADORES  -->
    <div>
      <!-- <div class="cards" v-for="individuos in moradores" :key="individuos.id"> -->
      <v-row>
        <v-col v-for="individuos in moradores" :key="individuos.id" cols="2">
          <v-card class="ma-2" width="170">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img v-if="individuos.foto" :src="individuos.foto"></v-img>
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
                        <v-icon>mdi-delete</v-icon>
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
              <v-dialog v-model="dialogEdit" persistent max-width="320">
                <template v-slot:activator="{on : dialogEdit}">
                  <v-tooltip bottom>
                    <template v-slot:activator="{on : tooltip}">
                      <v-btn
                        v-if="session === 'sindico'"
                        @click="check(individuos)"
                        small
                        darken
                        color="danger"
                        v-on="{...dialogEdit, ...tooltip}"
                      >
                        <v-icon>mdi-pen</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar Morador</span>
                  </v-tooltip>
                </template>
                <v-card>
      <v-card-title>
        <span class="headline">Editar Morador</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Nome*" v-model="nomeE" required hint="Ex.: Lucas"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Sobrenome*" v-model="sobrenomeE" required hint="Ex.: Capelo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Andar*" v-model="andarE" required hint="Ex.:1302"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['Masculino', 'Feminino']" v-model="sexoE" label="Sexo*" required></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['Morador', 'Agregado']" v-model="tipoE" label="Tipo*" required></v-select>
              </v-col>
              <v-col cols="12">
                <!-- <span>Foto:</span>
                <v-spacer></v-spacer>
                <v-btn small>
                  <input type="file" @change="OnFileSelected" />
                  <v-icon>mdi-upload</v-icon>
                </v-btn> -->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>
          <p class="red-text">*Campo Obrigatório</p>
        </small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger" text @click="dialogEdit=false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="editarMorador">Editar</v-btn>
      </v-card-actions>
    </v-card>
              </v-dialog>
              <!-- <EditButton /> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-snackbar
      v-model="snackbarDelete"
      :timeout="timeout"
      top
      color="success"
    >Usuário deletado com suceso</v-snackbar>
    <v-snackbar
      v-model="snackbarCadastro"
      :timeout="timeout"
      top
      color="success"
    >Usuário Cadastrado com sucesso</v-snackbar>
    <v-snackbar
      v-model="snackbarUpdate"
      :timeout="timeout"
      top
      color="success"
    >Usuário foi editado com suceso</v-snackbar>
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
import { timeout } from "q";
export default {
  components: { ViewPorteiro, MenuLateral, EditButton },
  props: ["session"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    nome: "",
    sobrenome: "",
    andar: "",
    sexo: "",
    tipo: "",
    foto: null,
    nomeE: "",
    sobrenomeE: "",
    andarE: "",
    sexoE: "",
    tipoE: "",    
    moradores: [],
    selectedFile: null,
    pessoaId: null,
    snackbarDelete: null,
    snackbarCadastro: null,
    snackbarUpdate:null,
    timeout: 3000,
    aux: 0
  }),
  created() {
    bancoDados
      .collection("morador")
      .orderBy("apartamento", "asc")
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
    deletarMorador() {
      let self = this;
      console.log(this.pessoaId);
      bancoDados
        .collection("morador")
        .doc(this.pessoaId)
        .delete()
        .then(function() {
          self.moradores = self.moradores.filter(morador => {
            return morador.id !== self.pessoaId;
          });
          console.log("O morador foi removido!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
          this.pessoaId = null;
        });
      this.dialogDelete = false;
      this.snackbarDelete = true;
    },
    check(morador) {
      console.log(morador.id);
      this.pessoaId = morador.id;
      ///////
    },
    // AtualizarMoradores(payload){
    //   console.log("cheguei aqui");
    //   this.moradores = payload.novoArray;
    //   this.moradores = this.moradores.filter(morador => {
    //     return morador.id;
    //   });
    //   console.log("morador cadastrado")
    // },
    cadastrar() {
      this.dialog = false;
      console.log(this.nome);
      console.log(this.sobrenome);
      console.log(this.andar);
      console.log(this.sexo);
      console.log(this.tipo);
      console.log(this.foto);
      
      const self = this;
      bancoDados.collection("morador").add({
        nome: this.nome,
        sobrenome: this.sobrenome,
        apartamento: this.andar,
        sexo: this.sexo,
        tipo: this.tipo,
        foto: this.foto        
      })      
      .then(function() {
        console.log(self.moradores)        
        self.IncreaseAux() 
          });
        
      
      console.log("AAAAAAAAAAAAAAAAAAAa")
      console.log(self.moradores)
      this.ClearForm();
      this.snackbarCadastro = true
    },
    editarMorador(){
      let self = this
      bancoDados
        .collection("morador")
        .doc(this.pessoaId)
        .update({
          nome: this.nomeE,
          sobrenome: this.sobrenomeE,
          apartamento: this.andarE,
          sexo: this.sexoE,
          tipo: this.tipoE
        })
        .then(function() {
          self.moradores = self.moradores.filter(morador => {
            return morador.id !== self.pessoaId;
          });
          console.log("O morador foi Editado!");
        })
      this.dialogEdit = false;
      this.snackbarUpdate = true;
    },
    OnFileSelected(event) {
      const self = this;
      this.selectedFile = event.target.files[0];
      var storageRef = firebase.storage().ref();
      var mountainImagesRef = storageRef.child(this.selectedFile.name);
      mountainImagesRef.put(this.selectedFile).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          self.foto = downloadURL;
        });
        console.log("Uploaded a blob or file!");
        console.log(self.foto);
      });
    },
    ClearForm() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    IncreaseAux(){
      this.aux++
    }
  }
};
</script>

<style>
</style>
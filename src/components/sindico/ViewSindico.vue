<template>
  <div class="header">
    <v-toolbar>
      <v-toolbar-title>Lista de Moradores</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- BOTÃO DE CADASTRO DE MORADORES  -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn fab depressed dark small color="orange" v-on="on">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
          <!-- MODAL DE PREENCHIMENTO DE DADOS DO MORADOR -->
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Cadastro de Morador</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="Nome*" v-model="nome" required hint="Ex.: Lucas"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Sobrenome*" v-model="sobrenome" required hint="Ex.: Capelo"></v-text-field>
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
                  <v-select :items="['Morador', 'Agregado']" v-model="tipo" label="Tipo*" required></v-select>
                </v-col>
                <v-col cols="12">
                  <span>Foto:</span>
                  <v-spacer></v-spacer>
                  <v-btn small>
                    <input type="file" @change="OnFileSelected">
                    <v-icon>mdi-upload</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
            <small>
              <p class="red-text">*Campo Obrigatório</p>
            </small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="danger" text @click="dialog = false">Cancelar</v-btn>
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
            <v-card shaped class="ma-2" width="255">
               <v-avatar
                class="profile"
                color="grey"
                size="164"
                tile
              >
                <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
              </v-avatar>
              <v-card-title class="headline">{{individuos.nome}} {{individuos.sobrenome}}</v-card-title>
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
                  <template v-slot:activator="{on}">  
                  <v-btn v-if="session === 'sindico'" @click="check(individuos)" small color="red" v-on="on" >
                    <v-icon color="white">mdi-delete</v-icon>
                  </v-btn>
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
                <v-btn v-if="session === 'sindico'" small color="danger">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>

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
import ViewPorteiro from "../porteiro/ViewPorteiro";
import bancoDados from "@/firebase/init";
import axios from 'axios';
import firebase from 'firebase';
export default {
  components: { ViewPorteiro },
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
    pessoaId: null,
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
    cadastrar() {
      this.dialog = false;
      console.log(this.nome);
      console.log(this.sobrenome);
      console.log(this.andar);
      console.log(this.sexo);
      console.log(this.tipo);
      bancoDados.collection("morador").add({
        nome: this.nome,
        sobrenome: this.sobrenome,
        apartamento: this.andar,
        sexo: this.sexo,
        tipo: this.tipo,
        foto: this.foto
      });
      OnFileSelected();
      
    },
    OnFileSelected(event){
      this.selectedFile = event.target.files[0]
      var storageRef = firebase.storage().ref();
      var mountainImagesRef = storageRef.child(this.selectedFile.name);
      mountainImagesRef.put(this.selectedFile).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        this.foto = downloadURL;
      });
        console.log('Uploaded a blob or file!');
      });
    },
    // onUpload(){
    //   const fd = new FormData();
    //   fd.append('image',this.selectedFile, this.selectedFile.name)
    //   axios.post('https://us-central1-appcara-cracha.cloudfunctions.net/uploadFile ', fd)
    //     .then(res =>{
    //       console.log(res);
    //     })
    // },
    deletarMorador(){
      this.dialogDelete = false
      console.log(this.pessoaId)
      bancoDados.collection("morador")
      .doc(this.pessoaId)
      .delete()
      .then(function() {
      console.log("O morador foi removido!");
      })
      .catch(function(error) {
      console.error("Error removing document: ", error);
      this.pessoaId = null
});

    },
    check(morador){
      console.log(morador.id)
      this.pessoaId = morador.id
    }
  }
};
</script>

<style>
</style>
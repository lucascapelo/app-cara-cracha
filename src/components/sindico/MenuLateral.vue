<template>
  <v-navigation-drawer permanent dark app color="#0f3252">
    <v-spacer></v-spacer>
    <v-list-item>
      <v-list-item-content>
        <v-img src="@/assets/cara-cracha.png"></v-img>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-list-item link v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase">Cadastrar Morador</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
    </v-list>
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
  methods: {
    cadastrar() {
      this.dialog = false;
      console.log(this.nome);
      console.log(this.sobrenome);
      console.log(this.andar);
      console.log(this.sexo);
      console.log(this.tipo);
      console.log(this.foto);

      bancoDados.collection("morador").add({
        nome: this.nome,
        sobrenome: this.sobrenome,
        apartamento: this.andar,
        sexo: this.sexo,
        tipo: this.tipo,
        foto: this.foto
      });
      console.log(this.foto);
      //   OnFileSelected();
    },
    OnFileSelected(event) {
      this.selectedFile = event.target.files[0];
      var storageRef = firebase.storage().ref();
      var mountainImagesRef = storageRef.child(this.selectedFile.name);
      mountainImagesRef.put(this.selectedFile).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          this.foto = downloadURL;
        });
        console.log("Uploaded a blob or file!");
        console.log(this.foto);
      });
    },
    ClearForm() {
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
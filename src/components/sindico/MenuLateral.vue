<template>
  <v-navigation-drawer permanent dark app color="#0f3252">
    <v-list-item>
      <v-list-item-content>
        <v-img src="@/assets/logo.png"></v-img>
        <!-- <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>-->
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <!-- PRECISA FAZER O FORM FUNCIONAR -->
    <v-list dense nav>
      <v-list-item link>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cadastrar</v-list-item-title>
          </v-list-item-content>
        </v-dialog>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
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
      });
    }
  }
};
</script>

<style>
</style>
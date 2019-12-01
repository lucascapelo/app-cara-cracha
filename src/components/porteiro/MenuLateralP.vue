<template>
  <v-navigation-drawer permanent dark app color="#0f3252">
    <v-spacer></v-spacer>

    <v-img src="@/assets/fundo.png">
      <v-list-item>
        <v-list-item-content>
          <v-img src="@/assets/cara-cracha.png"></v-img>
        </v-list-item-content>
      </v-list-item>
    </v-img>

    <v-divider></v-divider>

    <v-img src="@/assets/predio-menu-lateral.png" height="850px"></v-img>
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

      this.ClearForm();
      //   OnFileSelected();
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
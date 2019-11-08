<template>
  <div class="header">
    <v-toolbar>
      <v-toolbar-title>Lista de Moradores</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn fab depressed dark small color="orange" v-on="on">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
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
    <div>
      <div class="cards" v-for="individuos in moradores" :key="individuos.id">
        <v-card v-if="individuos.tipo === 'Morador'" class="ma-2" max-width="200">
          <v-card-title class="headline">{{individuos.nome}} {{individuos.sobrenome}}</v-card-title>
          <v-card-text>
            <div>
              <strong>{{individuos.sexo}}</strong>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="session === 'sindico'" small color="red">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="session === 'sindico'" small color="danger">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <!-- <ViewPorteiro /> -->
    </div>
  </div>
</template>

<script>
import ViewPorteiro from "../porteiro/ViewPorteiro";
import bancoDados from "@/firebase/init";
export default {
  components: { ViewPorteiro },
  props: ["session"],
  data: () => ({
    dialog: false,
    nome: "",
    sobrenome: "",
    andar: "",
    sexo: "",
    tipo: "",
    moradores: []
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
        foto: null
      });
    }
  }
};
</script>

<style>
</style>


<template>
  <!-- Salvar o id do andar em uma varialvel e fazer uma chamada no banco utilizando o Where para renderizar  -->
  <!-- os moradores específicos daquele andar -->
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
          <v-btn color="primary" v-bind="andar.num" @click="openMoradoresCard(andar)">{{andar}}</v-btn>

          <!-- Ao clicar, chamar componentes de moradores
            <Moradores
          :andarId="andarId"/>-->
          <!-- código do card -->
        </v-row>
      </v-col>
    </v-row>

    <!-- COMPONENT DE MORADORES -->
    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <v-toolbar dark color="blue darken-4">
          <v-btn color="primary" class="mr-7" @click="closeDialog">
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <span class="headline">Moradores</span>
        </v-toolbar>
        <v-container fluid>
          <v-row dense>
            <!-- CADA CARD DE MORADOR -->
            <div class="cards" v-for="individuos in moradores" :key="individuos.id">
              <v-card v-if="individuos.tipo === 'Morador'" class="ma-2" max-width="200">
                <v-card-title>{{individuos.nome}}</v-card-title>
                <v-card-text>
                  <div>
                    <strong>{{individuos.sexo}}</strong>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-row>
        </v-container>
        <v-toolbar dark color="blue darken-4">
          <span class="headline">Agregados</span>
        </v-toolbar>
        <v-container fluid>
          <v-row dense>
            <!-- CADA CARD DE AGREGADOS -->
            <div class="cards" v-for="individuos in moradores" :key="individuos.id">
              <v-card v-if="individuos.tipo === 'agregado'" class="ma-2" max-width="200">
                <v-card-title>{{individuos.nome}}</v-card-title>
                <v-card-text>
                  <div>
                    <strong>{{individuos.sexo}}</strong>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import bancoDados from "@/firebase/init";
import Moradores from "./Moradores";
export default {
  name: "ViewPorteiro",

  data() {
    return {
      dialog: false,
      apartamentos: [],
      moradores: [],
      andarId: null
    };
  },
  methods: {
    openMoradoresCard(andar) {
      this.andarId = andar;
      bancoDados
        .collection("morador")
        .where("apartamento", "==", this.andarId)
        .get()
        .then(snapshot => {
          snapshot.forEach(liver => {
            let morador = liver.data();
            morador.id = liver.id;
            this.moradores.push(morador);
          });
          console.log(this.moradores);
        });
      this.dialog = true;
      console.log(andar);
      this.moradores = [];
    },
    closeDialog() {
      this.dialog = false;
    }
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
      });
  }
};
</script>

<style>
</style>
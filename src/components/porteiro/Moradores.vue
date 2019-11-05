

<template>

  <v-dialog fullscreen v-model="dialog">
    <v-card>
    <v-toolbar dark color="blue darken-4">
      <span class="headline">Moradores {{andar}}</span>
    </v-toolbar>
    <v-container fluid>
      <v-row dense>        
          <!-- CADA CARD DE MORADOR -->
        <div class="cards" v-for="individuos in moradores"
            :key="individuos.id">
          <v-card v-if="individuos.tipo === 'morador'"
            class="ma-2"
            max-width="200"          
        >
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
        <div class="cards" v-for="individuos in moradores"
            :key="individuos.id">
          <v-card v-if="individuos.tipo === 'agregado'"
            class="ma-2"
            max-width="200"          
        >
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
</template>

<script>
import bancoDados from "@/firebase/init";
export default {
  props: ["andarId"],
  data() {
    return {
      moradores: []
    };
  },
  created() {
    //chamada de moradores
    bancoDados
      .collection("morador")
      .where("apartamento","==",andarId)
      .get()
      .then(snapshot => {
        snapshot.forEach(liver => {
          let morador = liver.data();
          morador.id = liver.id;
          this.moradores.push(morador);
        });
        console.log(this.moradores);
      });
      
  }
};
</script>

<style>
</style>
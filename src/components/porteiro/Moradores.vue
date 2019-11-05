

<template>

  <v-dialog>
    <v-card>
    <v-toolbar dark color="blue darken-4">
      <span class="headline">Moradores {{andar}}</span>
    </v-toolbar>
    <v-container fluid>
      <v-row dense>
        <div v-if="moradores.apartamento === andar.id">
          <!-- CADA CARD DE MORADOR -->
          <v-card
            class="ma-2"
            max-width="200"
            v-for="individuos in moradores"
            :key="individuos.andar"
          >
            <v-card-title>{{individuos.nome}}</v-card-title>
            <v-card-text>
              <div>
                <strong>{{individuos.sexo}}</strong>
              </div>

              <div>
                <span>{{individuos.tipo}}</span>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-row>
    </v-container>
    <v-toolbar dark color="blue darken-4">
      <span class="headline">Agregados</span>
    </v-toolbar>
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
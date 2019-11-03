<template>
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
      <v-col v-for="andar in apartamentos" :key="andar" class="text-center" cols="3">
        <v-row justify="center">
          <v-dialog fullscreen hide-overlay v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">{{andar}}</v-btn>
            </template>
            <!-- código do card -->
            <v-card>
              <v-toolbar dark color="blue darken-4">
                <span class="headline">Moradores {{andar}}</span>
              </v-toolbar>
              <v-container fluid>
                <v-row dense>
                  <div v-if="moradores.andar === andar.id">
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
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ViewPorteiro",
  props: ["moradores", "apartamentos"],
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style>
</style>
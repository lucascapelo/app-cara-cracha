<template>
  <div>
    <div class="header">
      <v-toolbar>
        <v-spacer></v-spacer>
        <span class="headline text-uppercase">Lista de Andares</span>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <v-row align="center">
      <v-col v-for="andar in apartamentos" :key="andar.id" class="text-center" cols="6">
        <v-row justify="center">
          <v-dialog v-model="dialog" width="800px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">{{andar}}</v-btn>
            </template>
            <v-toolbar></v-toolbar>
            <v-card>
              <v-card-title>
                <span class="headline">Use Google's location service?</span>
              </v-card-title>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="light grey" text @click="dialog = false">Voltar</v-btn>
              </v-card-actions>
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
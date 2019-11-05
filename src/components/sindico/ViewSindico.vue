<template>
  <div class="header">
    <h1>Teste</h1>
    <v-toolbar>
      <span>Adicionar Morador</span>
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
                <v-col cols="12">
                  <v-text-field label="Nome e Sobrenome*" required hint="Ex.:Lucas Capelo"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Andar*" required hint="Ex.:1302"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['Masculino', 'Feminino']" label="Sexo*" required></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['Morador', 'Agregado']" label="Tipo*" required></v-select>
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
            <v-btn color="blue darken-1" text @click="dialog = false">Cadastrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>

<style>
</style>
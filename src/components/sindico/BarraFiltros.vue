<template>
  <div class="divprincipal">
    <v-container fluid>
      <v-row class="ml-9">
        <v-col class="d-flex" cols="3">
          <v-combobox
            v-model="ordenarPorLocais"
            prepend-icon="mdi-home-city"
            :items="this.locaisNome"
            label="Apartamento"
            menu-props="auto"
            required
            outlined
            clearable
          ></v-combobox>
        </v-col>
        <v-col class="d-flex" cols="3">
          <v-combobox
            clearable
            v-model="ordenarPorUsuarios"
            prepend-icon="mdi-account-circle"
            :items="this.usuariosNome"
            label="IVIANO"
            menu-props="auto"
            required
            outlined
          ></v-combobox>
        </v-col>
        <v-col class="d-flex" cols="2">
          <v-btn fab dark depressed small color="orange" @click="filtragemDeDados()" class="mt-2">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar color="red darken-1" :top="true" v-model="snackbarSemPesquisa">
      É necessário preencher no mínimo um campo para pesquisar.
      <v-icon class="ml-2" color="white" text @click="snackbarSemPesquisa = false">mdi-close</v-icon>
    </v-snackbar>
  </div>
</template>
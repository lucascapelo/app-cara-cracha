

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
            <v-btn color="primary" v-bind="andar.num" 
            @click="openMoradoresCard(andar)"            
            >{{andar}}</v-btn>
            <!-- Ao clicar, chamar componentes de moradores
            <Moradores
            :andarId="andarId"/> -->
          <!-- código do card -->
        </v-row>
         
      </v-col>
    </v-row>
   
  </div>
</template>

<script>
import bancoDados from "@/firebase/init";
import Moradores from "./Moradores"
export default {
  name: "ViewPorteiro",
  
  data() {
    return {
      dialog: false,      
      apartamentos: [],
      andarId: null
    };
  },
  methods: {
    openMoradoresCard(andar){
      this.andarId = andar
      this.dialog = true
      console.log(andar)
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
<template>
<div class="body">
<!-- <v-img src="@/assets/TelaLogin.jpeg"> -->
  <v-card color="#0d2c48" height="1080" width="1920">
   <v-container fluid>
    <v-row >
      <v-img src="@/assets/cara-cracha.png" contain height="80" width="80"></v-img>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"         
          style="height: 300px;"
        >
          <v-card           
            class="ma-3 pa-6"
            outlined
            tile
          >
         
          
            <v-form>              
              <v-select
                v-model="usuario"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                prepend-inner-icon="mdi-account"
                label="Usuário"
                required
              ></v-select>
               
              
              <v-spacer></v-spacer>
              <v-text-field v-model="senha"
              :rules="senhaRules"
              prepend-inner-icon="mdi-lock"
              label="Senha"
              required>
              </v-text-field>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>
                Login
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-row>
      
      </v-col>
    </v-row>
  </v-container>
  </v-card>
  <!-- </v-img> -->
  </div>
</template>

<script>
export default {
data: () => ({
      valid: true,
      usuario: '',
      nameRules: [
        v => !!v || 'Usuário é requerido',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      senha: '',
      senhaRules: [
        v => !!v || 'Senha é requerida',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Sindico',
        'Conselho',
        'Porteiro',
        
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      login(){

      }
    },
}
</script>

<style scoped>


 
</style>
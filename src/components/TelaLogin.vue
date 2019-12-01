<template>
<div class="body">
<!-- <v-img src="@/assets/TelaLogin.jpeg"> -->
  <v-card color="#0d2c48" height="1080" width="1920">
   <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"
          class="grey lighten-5"
          style="height: 300px;"
        >
          <v-card           
            class="ma-3 pa-6"
            outlined
            tile
          >
          <v-img src="@/assets/cara-cracha.png" size="154"></v-img>
            <v-form>
              <v-text-field v-model="usuario"
              :rules="nameRules"
              label="Usuario"
              required>
              </v-text-field>
            </v-form>
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
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
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
    },
}
</script>

<style scoped>


 
</style>
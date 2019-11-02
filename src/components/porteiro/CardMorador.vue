<template></template>

<script>
import bancoDados from "@/firebase/init";
export default {
  data() {
    return {};
  },
  methods: {
    created() {
      bancoDados.collection("morador");
    }
  }
};
</script>

<style>
</style>
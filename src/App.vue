<template>
  <Navbar></Navbar>
  <Trains></Trains>
</template>

<script>
import Navbar from "@/components/Navbar";
import Trains from "@/components/Trains";

export default {
  name: 'App',
  components: {
    Trains,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <CalculatorForm />
</template>

<script>
import CalculatorForm from './components/CalculatorForm.vue'

export default {
  name: 'App',
  components: {
    CalculatorForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin: 60px 0;
}
</style>

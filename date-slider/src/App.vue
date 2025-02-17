<template>
  <div id="app">
    <div class="date-sliders">
      <DateSlider
        minDate="2019-01-01"
        maxDate="2020-12-31"
        startDate="2019-06-01"
        endDate="2020-09-01"
      />
      <DateSlider
        minDate="2019-01-01"
        maxDate="2026-12-31"
        startDate="2021-06-01"
        endDate="2025-09-01"
      />
    </div>
  </div>
</template>

<script>
import DateSlider from "./components/DateSlider.vue";

export default {
  name: "App",
  components: { DateSlider },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f4f6f9;
  margin-top: 60px;
}
</style>

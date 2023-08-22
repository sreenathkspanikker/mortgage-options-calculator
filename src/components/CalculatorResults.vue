<template>
  <div class="mortgage-options">
    <h2>Mortgage Options</h2>
    <table>
      <thead>
        <tr>
          <th>Fixation Year</th>
          <th>Monthly Rate</th>
          <th>Borrow Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, year) in options" :key="year">
          <td>{{ year }}</td>
          <td>{{ formatCurrency(option.monthlyRate) }}</td>
          <td>{{ formatPercentage(option.borrowingRate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CalculatorResults",
  props: {
    options: Object,
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    },
    formatPercentage(value) {
      return value.toFixed(2) + '%';
    },
  },
  created() {
    console.log('CalculatorResults component created');
    console.log('Options prop:', this.options);
  },
};
</script>

<style scoped>
.mortgage-options {
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
}

h2 {
  margin: 0;
  padding: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e1e1e1;
}

th,
td {
  padding: 10px 15px;
  text-align: left;
  border: 0;
  border-bottom: 1px solid #e1e1e1;
}

th {
  background-color: white;
  font-weight: bold;
  font-size: 13px;
  color: #555;
}

td {
  font-size: 14px;
}

/* Media query for screens narrower than 768px */
@media (max-width: 768px) {
  h2 {
    font-size: 18px;
  }
}
</style>

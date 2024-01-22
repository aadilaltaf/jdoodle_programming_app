<template>
  <div>
    <v-card v-if="testResults.length > 0" class="mt-5" color="black">
      <v-card-text class="text-h5 text-light-blue mt-3">
        Test Results
      </v-card-text>
      <pre class="ml-5 mt-3 mb-4">{{ testResults }}</pre>
    </v-card> 
    <v-card v-if="compilerResults" class="mt-5" color="black"> 
      <v-card-text class="text-h5 text-light-blue mt-3">
        Output
      </v-card-text>
      <pre class="ml-5 mt-3 mb-4">{{ compilerResults }}</pre>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ResultsPage",
  computed: {
    compilerResults() {
      return this.$store.state.compilerResult;
    },
    testResults() {
      return this.$store.state.testResults;
    },
  },
};
</script>

<style scoped>
</style>
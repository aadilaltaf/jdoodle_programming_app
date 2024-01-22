<template>
  <v-row align="start" no-gutters>
    <v-col cols="6">
      <v-progress-linear :model-value="(this.$store.getters.userScore * 20)" height="30" bg-color="accent" color="success" rounded><span class="text-h6 text-center text-white">Progress</span></v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
};
</script>
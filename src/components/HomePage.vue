<template>
  <v-card>
    <v-layout>
      <v-app-bar
        prominent
      > 
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title><v-icon>mdi-arrow-left-bold</v-icon> Problem Bank</v-toolbar-title>
        <v-spacer></v-spacer>
        <ProgressBar></ProgressBar>
      </v-app-bar>
      <v-row align="start" no-gutters>
        <v-col cols="6">
          <v-navigation-drawer
            v-model="drawer"
            location="left"
            :width="400"
          > 
            <v-list v-if="problems.length" class="mt-3">
              <v-list-item v-for="problem in problems" :key="problem.id" link>
                <v-list-item-title @click="selectProblem(problem)">
                  <v-radio v-model="selectedProblem" :value="problem.id" :label="problem.title"></v-radio>
                 </v-list-item-title>
              </v-list-item>
            </v-list>
            
          </v-navigation-drawer>
          
          <v-row class="ml-10 mt-16" no-gutters>
            <v-col class="mt-5">
              <v-card-text class="text-h4 text-brown">
              {{  $store.getters.getSelectedProblem.title }}
              </v-card-text>
              <v-card-text class="text-h6 text-grey-darken-1">
              {{  $store.getters.getSelectedProblem.description }}
              </v-card-text>
              <v-card-text class="text-h6 text-green" >
                Examples:
              </v-card-text>
              <v-card-text class="text-subtitle-1" v-for="example in $store.getters.getSelectedProblem.examples" :key="example">
              <span class="text-body-1">Sample Input: </span> 
              <span class="text-body-2">
                {{  example.input }}
              </span><br />
              <span class="text-body-1">Sample Output: </span>
              <span class="text-body-2">
                {{  example.output }}
              </span>
              </v-card-text>

              <v-card-text class="text-h6 text-warning" >
                Testcases:
              </v-card-text>
              <v-card-text class="text-subtitle-1" v-for="testcase in $store.getters.getSelectedProblem.testCases" :key="testcase">
              <span class="text-body-1">Input: </span> 
              <span class="text-body-2">
                {{  testcase.input }}
              </span><br />
              <span class="text-body-1">Expected Output: </span>
              <span class="text-body-2">
                {{  testcase.expectedOutput }}
              </span>
              </v-card-text>
            </v-col>
          </v-row> 
        </v-col>
        <v-col cols="6">
          <CodeEditor :answer="answer"></CodeEditor>
          
        </v-col>
      </v-row>
      
    </v-layout>
  </v-card>
</template>

<script>
import CodeEditor from './CodeEditor.vue'
import ProgressBar from './ProgressBar.vue';


export default {
  name: "HomePage",
  components: {
    CodeEditor,
    ProgressBar,
  },
  data() {
    return {
      drawer: false,
    };
  },
  
  computed: {
    problems() {
      return this.$store.state.currentProblemSet;
    },
    selectedProblem: {
      get() {
        return this.$store.state.selectedProblem ? this.$store.state.selectedProblem.id : null;
      },
      set(value) {
        this.$store.dispatch('selectProblem', this.problems.find(problem => problem.id === value));
      },
    },
  },
  methods: {
    selectProblem(problem) {
      this.$store.dispatch('selectProblem', problem);
    },
    isSelected(problem) {
      if(this.$store.getters.getSelectedProblem === problem) {
        return true;
      } else {
        return false;
      }
    },
    
  },
  created() {
    this.$store.dispatch('fetchCurrentProblemBank');
  },
};
</script>

<style scoped>
</style>
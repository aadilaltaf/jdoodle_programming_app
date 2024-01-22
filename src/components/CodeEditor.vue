<template>
    <v-container fill-height fluid class="mt-16">
      <v-row align="start" no-gutters>
        <v-col>
          <v-select
            :value="['Javascript']"
            readonly
          ></v-select>
          <codemirror
            v-model="code"
            placeholder="Code goes here..."
            :style="{ height: '600px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
          />

          <v-btn elevation="7" color="warning" rounded="xl" class="mr-3 mt-5" @click="runUsingWebsocketAPI" :disabled="!code">
            <v-icon class="mr-2">mdi-play</v-icon>Run</v-btn>

          <v-btn elevation="7" color="secondary" rounded="xl" class="mr-3 mt-5" @click="testSolution" :disabled="!code">
            <v-icon class="mr-2">mdi-test-tube</v-icon>Test</v-btn>

          <v-btn elevation="7" color="success" rounded="xl" class="mr-3 mt-5" @click="submitAnswer" :disabled="!code">
            <v-icon class="mr-2">mdi-cloud-arrow-up</v-icon>Submit</v-btn>

          <ResultPage></ResultPage>

        </v-col>
      </v-row>
      
      
    </v-container>
</template>
<script>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import ResultPage from './ResultPage.vue'
import WebSocketService from '@/services/WebSocketService';
import ApiService from '@/services/ApiService';

export default {
  name: "CodeEditor",
  components: {
    Codemirror,
    ResultPage
  },
  created() {
      this.extensions = [javascript(), oneDark];
  },
  data() {
    return {
      code: this.$store.state.userAnswers[this.$store.state.selectedProblem.id] || '',
    };
  },
  mounted() {
    this.fetchToken();
  },
  beforeUnmount() {
    WebSocketService.disconnect();
  },
  watch: {
    '$store.state.selectedProblem': {
      handler(newProblem) {
        this.code = this.$store.state.userAnswers[newProblem.id] || '';
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async fetchToken() {
      try {
        const clientId = this.$store.state.clientId;
        const clientSecret =  this.$store.state.clientSecret;

        const token = await ApiService.getToken(clientId, clientSecret);
        console.log('Received token:', token);
        this.$store.commit('setToken', token);

        WebSocketService.connect(token, (message) => {
          this.handleWebSocketMessage(message);
        });

      } catch (error) {
        console.error('Error fetching token:', error);
      }
    },

    async runUsingWebsocketAPI() {
      this.$store.commit('resetCompilerResult');
      const data = JSON.stringify({
            script: this.code,
            language: "nodejs",
            versionIndex: 4,
          })
      WebSocketService.send('/app/execute-ws-api-token', data, { message_type: 'execute', token: this.$store.state.token });
    },
    onInput(event) {
      let key = event.key;
      if (event.key === 'Enter') {
        key = '\n';
      }
      WebSocketService.send('/app/execute-ws-api-token', key, { message_type: 'input' });
    },
    handleWebSocketMessage(message) {
      const statusCode = message.headers.statusCode;
      const body = message.body;
      const destination = message.headers.destination;
      const contentLength = message.headers.contentLength;

      switch (statusCode) {
        case "200":
          console.log("Status Code 200 OK");
          this.$store.commit('setCompilerResult', body);
          break;
        case "201":
          console.log("Status Code 201 Created");
          console.log("Destination:", destination);
          break;
        case "204":
          console.log("Status Code 204 No Content");
          console.log("Content Length:", contentLength);
          console.log("Body:", body);
          break;
        case "206":
          console.log("Status Code 206 Partial Content");
          console.log("Content Length:", contentLength);
          break;
        case "400":
          console.log("Status Code 400 Bad Request");
          console.log("Destination:", destination);
          break;
        default:
          console.log("Unhandled Status Code:", statusCode);
          break;
        }  
    },
    submitAnswer() {
      this.$store.commit('setUserAnswer', {
        problemId: this.$store.state.selectedProblem.id,
        answer: this.code,
      });
    },
    async testSolution() {
       this.$store.dispatch('executeCode', this.code);
    },


    // initializeJDoodle() {
    //   const jdoodleContainer = this.$refs.jdoodleContainer;

    //   const scriptElement = document.createElement('script');
    //   scriptElement.src = 'https://www.jdoodle.com/assets/jdoodle-pym.min.js';
    //   scriptElement.type = 'text/javascript';

    //   jdoodleContainer.appendChild(scriptElement);

    //   const jdoodleIframe = document.createElement('div');
    //   jdoodleIframe.setAttribute('data-pym-src', 'https://www.jdoodle.com/plugin');
    //   jdoodleIframe.setAttribute('data-language', 'python3'); // Change the language as needed
    //   jdoodleIframe.setAttribute('data-version-index', '0');
    //   jdoodleIframe.innerHTML = '// Optional default code goes here';

    //   jdoodleContainer.appendChild(jdoodleIframe);
    // },
  },
};
</script>

<style scoped>
</style>
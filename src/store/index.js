import { createStore } from 'vuex';
// import axios from 'axios';
import ApiService from '@/services/ApiService';


export default createStore({
  state: {
    clientId: '8235ccbb2949093c0be9914aa493ceb1',
    clientSecret: '738d8bc709c5d3c8d812ada15367bddff938cdfd66e64db88f34980be0d2e705',
    // clientId: '',
    // clientSecret: '',
    selectedProblem: null,
    userAnswers: {},
    problemBank: [],
    currentProblemSet: [],
    executionResult: '',
    compilerResult: '',
    token: null,
    testResults: [],
    userProgress: {}
  },
  mutations: {
    setSelectedProblem(state, problem) {
      state.selectedProblem = problem;
    },
    setUserAnswer(state, { problemId, answer }) {
      state.userAnswers = {
        ...state.userAnswers,
        [problemId]: answer,
      };
    },
    setProblemBank(state) {
      // Hardcoded list of 10 sample problems with increased difficulty
      state.problemBank = [
        {
          id: 1,
          title: 'Reverse String',
          description: 'Write a function that reverses a string.',
          testCases: [
            { input: 'hello', expectedOutput: 'olleh' },
            { input: 'world', expectedOutput: 'dlrow' },
          ],
          examples: [
            { input: 'abc', output: 'cba' },
            { input: '12345', output: '54321' },
          ],
          passed: false,
        },
        {
          id: 2,
          title: 'Two Sum',
          description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
          testCases: [
            { input: [ [2, 7, 11, 15], { target: 9}], expectedOutput: [0, 1] },
            { input: [[3, 2, 4], { target: 6 }] , expectedOutput: [1, 2] },
          ],
          examples: [
            { input: [[1, 2, 3, 4, 5], {target: 9}], output: [3, 4] },
            { input: [[10, 20, 30, 40], {target: 70}], output: [2, 3] },
          ],
          passed: false,
        },
        {
          id: 3,
          title: 'Palindrome Check',
          description: 'Write a function to check if a string is a palindrome.',
          testCases: [
            { input: 'racecar', expectedOutput: true },
            { input: 'hello', expectedOutput: false },
          ],
          examples: [
            { input: 'level', output: true },
            { input: 'algorithm', output: false },
          ],
          passed: false,
        },
        {
          id: 4,
          title: 'Factorial',
          description: 'Write a function to calculate the factorial of a non-negative integer.',
          testCases: [
            { input: 5, expectedOutput: 120 },
            { input: 0, expectedOutput: 1 },
          ],
          examples: [
            { input: 3, output: 6 },
            { input: 6, output: 720 },
          ],
          passed: false,
        },
        {
          id: 5,
          title: 'Max Number in Array',
          description: 'Write a program that finds and returns the maximum number in an array of integers.',
          testCases: [
            { input: [1, 2, 3, 4, 5], output: 5 },
            { input: [10, 5, 7, 3, 8], output: 10 },
            { input: [-1, -5, -3, -8, -2], output: -1 },
          ],
          examples: [
            { input: [1, 2, 3, 4, 5], output: 5 },
            { input: [10, 5, 7, 3, 8], output: 10 },
            { input: [-1, -5, -3, -8, -2], output: -1 },
          ],
          passed: false,
        },
        {
          id: 6,
          title: 'Merge Intervals',
          description: 'Given a collection of intervals, merge overlapping intervals.',
          testCases: [
            { input: [[1, 3], [2, 6], [8, 10], [15, 18]], expectedOutput: [[1, 6], [8, 10], [15, 18]] },
            { input: [[1, 4], [4, 5]], expectedOutput: [[1, 5]] },
          ],
          examples: [
            { input: [[1, 4], [0, 2], [3, 5]], output: [[0, 5]] },
            { input: [[1, 3], [2, 4], [5, 7]], output: [[1, 4], [5, 7]] },
          ],
          passed: false,
        },
        {
          id: 7,
          title: 'Longest Common Subsequence',
          description: 'Given two strings, find the length of their longest common subsequence.',
          testCases: [
            { input: ['abcde', 'ace'], expectedOutput: 3 },
            { input: ['abc', 'abc'], expectedOutput: 3 },
          ],
          examples: [
            { input: ['AGGTAB', 'GXTXAYB'], output: 4 },
            { input: ['ABCD', 'EACB'], output: 2 },
          ],
          passed: false,
        },
        {
          id: 8,
          title: 'Maximum Subarray Sum',
          description: 'Find the contiguous subarray with the largest sum.',
          testCases: [
            { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expectedOutput: 6 },
            { input: [1], expectedOutput: 1 },
          ],
          examples: [
            { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], output: [4, -1, 2, 1] },
            { input: [1, 2, -1, 3, 4, -1, 2, 1], output: [3, 4, -1, 2, 1] },
          ],
          passed: false,
        },
        {
          id: 9,
          title: 'Valid Parentheses',
          description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\', and \']\', determine if the input string is valid.',
          testCases: [
            { input: '()[]{}', expectedOutput: true },
            { input: '(]', expectedOutput: false },
          ],
          examples: [
            { input: '(){}[]', output: true },
            { input: '([{}])', output: true },
          ],
          passed: false,
        },
        {
          id: 10,
          title: 'Word Break',
          description: 'Given a string s and a dictionary of words dict, determine if s can be segmented into a space-separated sequence of one or more dictionary words.',
          testCases: [
            { input: 'leetcode', dict: ['leet', 'code'], expectedOutput: true },
            { input: 'applepenapple', dict: ['apple', 'pen'], expectedOutput: true },
          ],
          examples: [
            { input: 'applepenapple', dict: ['apple', 'pen'], output: true },
            { input: 'catsandog', dict: ['cats', 'dog', 'sand', 'and', 'cat'], output: false },
          ],
          passed: false,
        },
      ];
    },
    setCurrentProblemSet(state, problems) {
      state.currentProblemSet = problems;
    },
    setExecutionResult(state, result) {
      state.executionResult = result;
    },
    setCompilerResult(state, result) {
      state.compilerResult += result;
    },
    resetCompilerResult(state) {
      state.compilerResult = '';
    },
    setToken(state, token) {
      state.token = token;
    },
    resetTestResults(state) {
      state.testResults = [];
    },
    addTestResult(state, testResult) {
      state.testResults.push(testResult);
    },
    setPassed(state, { problemId, passed }) {
      state.userProgress[problemId] = passed;
    },
  },
  actions: {
    selectProblem({ commit }, problem) {
      commit('setSelectedProblem', problem);
    },
    submitAnswer({ commit }, { problemId, answer }) {
      commit('setUserAnswer', { problemId, answer });
    },
    resetTestResults({ commit }) {
      commit('resetTestResults');
    },
    addTestResult({ commit }, testResult) {
      commit('addTestResult', testResult);
    },
    fetchProblemBank({ commit }) {
      commit('setProblemBank');
    },
    fetchCurrentProblemBank({state, commit}) {
      commit('setProblemBank');
      const problems = state.problemBank.sort(() => Math.random() - 0.5).slice(0, 5);
      commit('setCurrentProblemSet', problems);
      commit('setSelectedProblem', problems[0]);
    },

    async executeCode({ commit, state }, code) {
      try {
        commit('resetTestResults');
    
        const testCases = state.selectedProblem.testCases;
        let flag = true;
        for (const testCase of testCases) {
          if (String(code).includes(String(testCase.input)) || String(code).includes(String(testCase.input)['target']) || String(code).includes(String(testCase.input[0])) ) {
            flag = false;
            const data = {
              script: code,
              language: "nodejs",
              versionIndex: 4,
              stdin: testCase.input,
              clientId: state.clientId, 
              clientSecret: state.clientSecret,
            };
      
            const result = await ApiService.executeCode(data);
            const isSuccess = String(result.output).trim().replace(/\\/g, '') == String(testCase.expectedOutput).trim();

            const index = state.currentProblemSet.findIndex((problem) => problem.id === state.selectedProblem.id);
            if (index !== -1) {
              commit('setPassed', { problemId: state.selectedProblem.id, passed: isSuccess });
            }
  

            commit('addTestResult', {
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: String(result.output).trim().replace(/\\/g, ''),
              result: isSuccess ? 'Test Passed' : 'Test Failed',
            });
          } 
        }
        if(flag) {
          commit('addTestResult', "Test Case not found in the code");
        }
      } catch (error) {
        console.error('Error executing code:', error);
      }
    }
  },
  getters: {
    getSelectedProblem: (state) => state.selectedProblem,
    getTestResults: (state) => state.testResults,
    userScore: (state) => {
      const passedProblems = Object.values(state.userProgress).filter((passed) => passed);
      return passedProblems.length;
    },
  },
});
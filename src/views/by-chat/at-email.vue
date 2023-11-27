<template>
    <div>
      <input v-model="inputText" @input="handleInput">
      <ul v-if="showEmailList" ref="emailList" class="email-list">
        <li v-for="email in emailList" :key="email" @click="selectEmail(email)">{{ email }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputText: '',
        showEmailList: false,
        emailList: [
          'example1@example.com',
          'example2@example.com',
          'example3@example.com'
        ]
      }
    },
    methods: {
      handleInput() {
        const atIndex = this.inputText.lastIndexOf('@');
        if (atIndex > -1 && atIndex === this.inputText.length - 1) {
          this.showEmailList = true;
          const inputEl = this.$refs.emailList.previousElementSibling;
          const inputRect = inputEl.getBoundingClientRect();
          console.log('inputRect', inputRect)
          this.$refs.emailList.style.top = `${inputRect.bottom}px`;
          this.$refs.emailList.style.left = `${inputRect.left}px`;
        } else {
          this.showEmailList = false;
        }
      },
      selectEmail(email) {
        this.inputText = this.inputText.slice(0, this.inputText.lastIndexOf('@') + 1) + email;
        this.showEmailList = false;
      }
    }
  }
  </script>
  
  <style>
  .email-list {
    position: absolute;
    z-index: 999;
    background-color: #fff;
    padding: 0;
    margin: 0;
    list-style: none;
    border: 1px solid #ccc;
  }
  .email-list li {
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
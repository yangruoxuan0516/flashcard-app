<script setup>
import { ref } from 'vue';
import { auth } from '../firebase/firebase.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

const signup = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    successMsg.value = 'Account created! You can now log in.';
    email.value = '';
    password.value = '';
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <input v-model="email" placeholder="Email" class="input"/>
    <input v-model="password" type="password" placeholder="Password (min 6 chars)" class="input"/>
    <button @click="signup" class="button">Create Account</button>

    <p v-if="successMsg" style="color: green;">{{ successMsg }}</p>
    <p v-if="errorMsg" style="color: red;">{{ errorMsg }}</p>
  </div>
  <router-link to="/login">Already have an account? Log in</router-link>
</template>


<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* horizontal centering */
  margin-top: 20px;
}

.input {
  width: 300px;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
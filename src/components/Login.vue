<script setup>
import { ref } from 'vue';
import { auth } from '../firebase/firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

const login = async () => {
console.log('Login clicked');
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/');
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Log In</h2>
    <input v-model="email" placeholder="Email" class="input"/>
    <input v-model="password" type="password" placeholder="Password" class="input"/>
    <button @click="login" class="button">Login</button>
    <p v-if="errorMsg">{{ errorMsg }}</p>
  </div>
  <router-link to="/signup">Don't have an account? Sign up</router-link>

</template>

<style scoped>
.login-container {
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
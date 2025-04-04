<script setup>
import { ref, onMounted } from 'vue';
import { db, auth } from '../firebase/firebase.ts';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const flashcards = ref([]);
const newFront = ref('');
const newBack = ref('');

const fetchFlashcards = async () => {
  const user = auth.currentUser;
  if (!user) {
    flashcards.value = [];
    return;
  }

  const q = query(collection(db, 'flashcards'), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  flashcards.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addFlashcard = async () => {
  console.log('Add Flashcard clicked');

  const user = auth.currentUser;
  if (!user) {
    alert('Please log in to add flashcards.');
    return;
  }

  if (!newFront.value || !newBack.value) return;

  await addDoc(collection(db, 'flashcards'), {
    userId: user.uid,
    front: newFront.value,
    back: newBack.value
  });

  newFront.value = '';
  newBack.value = '';
  fetchFlashcards();
};

onMounted(fetchFlashcards);
</script>

<template>
  <div class="add-card-container">
    <h2>Adding cards ...</h2>

    <input v-model="newFront" placeholder="Front of card" class="input" />
    <input v-model="newBack" placeholder="Back of card" class="input" />
    <button @click="addFlashcard" class="button">Add Card</button>

    <hr class="divider" />

    <router-link to="/" class="nav-link">Review Cards</router-link>

    <ul>
      <li v-for="card in flashcards" :key="card.id">
        {{ card.front }} ➖ {{ card.back }}
      </li>
    </ul>
  </div>
</template>


<style scoped>
.add-card-container {
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
}

.nav-link {
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
  color: black;
  background-color:rgb(247, 247, 247); /* light gray background */
  border-radius: 8px; /* rounded corners */
  margin-top: 10px;
  margin-bottom: 20px;
}


ul {
  margin-top: 20px;
  list-style-type: none; /* remove default bullet points */
  padding: 0;
}

.divider {
  border: none;
  height: 1px;
  background-color: #ddd; /* light gray line */
  margin: 30px 0 20px;
  width: 100%;
  max-width: 400px; /* match ul width if needed */
}

</style>


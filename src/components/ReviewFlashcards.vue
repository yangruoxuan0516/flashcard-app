<script setup>
import { ref, onMounted } from 'vue';
import { db, auth } from '../firebase/firebase.ts';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import vueFlashcard from './flashcard.vue';

const flashcards = ref([]);
const currentIndex = ref(0);
const finished = ref(false);
const forceFront = ref(false);

const fetchFlashcards = async () => {
  const user = auth.currentUser;
  if (!user) {
    flashcards.value = [];
    return;
  }

  const q = query(collection(db, 'flashcards'), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  flashcards.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  currentIndex.value = 0;
  finished.value = false;
};

onMounted(fetchFlashcards);

const nextCard = () => {
  forceFront.value = true;

  setTimeout(() => {
    forceFront.value = false;
    if (currentIndex.value < flashcards.value.length - 1) {
      currentIndex.value++;
    } else {
      finished.value = true;
    }
  }, 100);
};
</script>

<template>
  <div>

    <div v-if="flashcards.length === 0 && !finished">
      <p>No flashcards found.</p>
    </div>

    <div v-else-if="!finished">
      <h2>Reviewing...</h2>
      <vue-flashcard
        :front="flashcards[currentIndex]?.front"
        :back="flashcards[currentIndex]?.back"
        :width="300"
        :height="200"
        :headerFront="'Question'"
        :forceFront="forceFront"
      />

      <div style="margin-top: 20px;">
        <button @click="nextCard">✅ Got it right!</button>
        <button @click="nextCard" style="margin-left: 10px;">❌ Can't remember...</button>
      </div>
    </div>

    <div v-else>
      <p>🎉 Congrats! You've finished reviewing all of your cards!</p>
    </div>

    <router-link to="/add" class="nav-link">Add Cards</router-link>
  </div>
</template>


<style scoped>
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
</style>
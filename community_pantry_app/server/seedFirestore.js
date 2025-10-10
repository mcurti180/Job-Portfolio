const { initializeApp } = require('firebase/app');
const { getFirestore, collection, setDoc, doc } = require('firebase/firestore');
const data = require('./feedData'); // Your data file
const firebaseConfig = require('./firebaseConfig'); // Your Firebase config

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Upload users
data.users.forEach(async (user) => {
  await setDoc(doc(db, 'users', user.id), user);
});

// Upload posts
data.posts.forEach(async (post) => {
  await setDoc(doc(db, 'posts', post.id), post);
});

console.log('Data upload complete.');


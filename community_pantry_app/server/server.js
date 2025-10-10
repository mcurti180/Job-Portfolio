const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, doc, setDoc } = require('firebase/firestore');

// Your firebaseConfig object here:
const firebaseConfig = {
  apiKey: "AIzaSyCV_c4hN5SJQohHINEl7TjXpBilYGkryHw",
  authDomain: "communitypantry-41662.firebaseapp.com",
  projectId: "communitypantry-41662",
  storageBucket: "communitypantry-41662.firebasestorage.app",
  messagingSenderId: "218731136113",
  appId: "1:218731136113:web:1e9aa4d63ba451467847d0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const appExpress = express();
const port = 3000;

appExpress.use(cors());
appExpress.use(express.json());

// Helper to get all users from Firestore
async function getUsersFromFirestore() {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => doc.data());
  return usersList;
}

// Helper to get all posts from Firestore
async function getPostsFromFirestore() {
  const postsCol = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map(doc => doc.data());
  return postsList
}

appExpress.get('/users', async (req, res) => {
  try {
    const users = await getUsersFromFirestore();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get users', error: err.message });
  }
});

// get all posts
appExpress.get('/posts', async (req, res) => {
  try {
    const posts = await getPostsFromFirestore();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get posts', error: err.message });
  }
});

// Post a new post
appExpress.post('/posts', async (req, res) => {
  const { title, description, category, image } = req.body;

  try {
    const posts = await getPostsFromFirestore();
    const newPost = {
      id: 'post-' + (posts.length + 1),
      title,
      description,
      category,
      image: image || '',
    };
    const postDoc = doc(db, 'posts', newPost.id);
    await setDoc(postDoc, newPost);

    res.status(201).json({ message: 'Posts Registered', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register post', error: err.message });
  }
});

// Restister new user Post
appExpress.post('/register', async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    const users = await getUsersFromFirestore();
    const newUser = {
      id: 'user-' + (users.length + 1),
      name,
      email,
      password,
      avatar: avatar || '',
    };

    const userDoc = doc(db, 'users', newUser.id);  // Use custom ID
    await setDoc(userDoc, newUser);                // Save with that ID

    res.status(201).json({ message: 'User Registered', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
});

// Post Login
appExpress.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await getUsersFromFirestore();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


// Start the app
appExpress.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
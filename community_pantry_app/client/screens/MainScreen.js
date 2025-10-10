import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import data from '../feedData';
import FriendCard from '../components/feed/FriendCard';
import FriendPost from '../components/feed/FriendPost';


const FeedScreen = () => {
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setFriends(data))
      .catch(err => console.error('Failed to fetch users:', err));

    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Friends</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsScroll}>
        {friends.map(friend => (
          <FriendCard
            key={friend.id}
            name={friend.name}
            avatar={friend.avatar}
            onPress={() => console.log('Pressed:', friend.name)}
          />
        ))}
      </ScrollView>

      <Text style={styles.header}>Community Feed</Text>
      <View style={styles.postsContainer}>
        {posts.map(post => (
          <FriendPost
            key={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            category={post.category}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8', // subtle background tone
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
    color: '#333',
  },
  friendsScroll: {
    marginBottom: 10,
  },
  postsContainer: {
    gap: 16, // if supported, or use marginBottom on individual post
  }
});

export default FeedScreen;
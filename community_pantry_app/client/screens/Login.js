import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import users from '../userData';
import styles from '../styles/Styles';
import data from '../feedData';


export default function LoginOrRegister({ navigation }) {
    useEffect(() => {
      const logUsers = () => {
        data.friends.forEach(friend => {
          console.log(friend.email)
        })
      }
      logUsers()
    }, [])
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          console.log('loggggin successfully')
          navigation.navigate('HomeFeed'); // ✅ Just navigate on success
        } else {
          alert('Login failed. Check your email and password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred while logging in.');
      }
    };

  
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/logo.png')}
          style={[styles.image_logo, { marginBottom: 25}]}
        />

        <TextEntryForm
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          style={{marginTop:20}}
        />

        <TextEntryForm
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <ButtonComponent
          title="Login"
          onPress={handleLogin}
        />
        
        <Text>OR</Text>
        
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ fontSize:12, color:'blue', textDecorationLine: 'underline'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
  
  function TextEntryForm (props) {
    const {placeholder, text, onChangeText, secureTextEntry} = props
    return (
      <View>
        <TextInput
          style = {styles.input}
          placeholder={placeholder}
          value={text}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    )
  }
  
  function ButtonComponent(props) {
    const { title, onPress, color } = props;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
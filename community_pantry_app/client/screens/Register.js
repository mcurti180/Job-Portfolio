import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import users from '../userData';
import styles from '../styles/Styles';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null); // rename for clarity

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // square crop
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // new API returns assets array
    }
  };

  const handleRegister = async () => {
    const newUser = {
      name,
      email,
      password,
      avatar: 'https://example.com/default-avatar.png',
    };
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if(response.ok) {
        alert('Registration Successful!');
        props.navigation.navigate('LoginOrRegister');
      } else {
        alert('Registration Failed.');
      }
    } catch(error) {
      console.error('Registration error:', error);
      alert('An error occured while registering.');
    }
  };

  return (
    <View style={styles.register}>
      <View style={{ marginTop: 10, width: '77%', alignItems: 'flex-start' }}>
        <Image source={require('../assets/logo.png')} style={styles.image_logo} />

        <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 14 }}>
          Please create a Free account
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text>Name</Text>
          <TextEntryForm placeholder="Name" value={name} onChange={setName} />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>Email</Text>
          <TextEntryForm placeholder="email" value={email} onChange={setEmail} />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>Password</Text>
          <TextEntryForm placeholder="Password" value={password} onChange={setPassword} secureTextEntry />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text>Profile Picture</Text>
          <TouchableOpacity onPress={pickImage} style={{ alignSelf: 'flex-start', paddingVertical: 5 }}>
            <Text style={{ fontSize: 12, color: 'blue', textDecorationLine: 'underline' }}>
              Pick an image from device
            </Text>
          </TouchableOpacity>


          {imageUri && (
            <View>
              <Image
                source={{ uri: imageUri }}
                style={{ width: 100, height: 100, marginTop: 10, borderRadius: 8 }}
              />
              <TouchableOpacity onPress={() => setImageUri('')} style={{ alignSelf: 'flex-start', paddingVertical: 5 }}>
                <Text style={{ fontSize:12, color:'blue', textDecorationLine: 'underline'}}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          
        </View>
        
            
        <ButtonComponent title="Register" onPress={handleRegister} />

      </View>
    </View>
  );
};

function TextEntryForm(props) {
  const { placeholder, value, onChange, secureTextEntry } = props;
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
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

export default Register;

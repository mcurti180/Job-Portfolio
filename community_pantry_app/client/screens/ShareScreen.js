import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/Styles';
import { Picker } from '@react-native-picker/picker'

const ShareScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [imageUri, setImageUri] = useState(null);

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

  const handlePost = async () => {
    const newPost = {
      title,
      description,
      category,
      image: imageUri || 'https://images.unsplash.com/photo-1604908811192-2603f88b8b0a?auto=format&fit=crop&w=600&q=60',
    };
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if(response.ok) {
        alert('Post Successful');
        props.navigation.navigate('Feed');
      } else{
        alert('Post Failed to Register');
      }
    } catch(error){
      console.log('Upload error', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <View styl={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create a Listing</Text>
      </View>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>Photos</Text>
        <TouchableOpacity onPress={pickImage} style={{ paddingVertical: 4 }}>
          <Text style={{ fontSize: 14, color: 'blue', textDecorationLine: 'underline' }}>
            Add photos
          </Text>
        </TouchableOpacity>

        {imageUri && imageUri.startsWith('file://') && (
          <View style={{ marginTop: 10 }}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 120, height: 120, borderRadius: 10 }}
            />
            <TouchableOpacity onPress={() => setImageUri('')} style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, color: 'blue', textDecorationLine: 'underline' }}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>Title</Text>
        <TextEntryForm
          placeholder="Enter a descriptive title"
          value={title}
          onChange={setTitle}
          style={{ paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6 }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: 6,
            paddingVertical: 8
          }}
        >
          <Picker.Item label="Choose one..." value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Household Items" value="household items" />
          <Picker.Item label="Baby Supplies" value="baby supplies" />
          <Picker.Item label="Furniture" value="furniture" />
          <Picker.Item label="Books and Toys" value="books and toys" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        <Text style={{ marginTop: 8, fontStyle: 'italic' }}>You selected: {category}</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 6, fontWeight: 'bold' }}>Description</Text>
        <TextInput
          style={{
            height: 100,
            backgroundColor: '#f9f9f9',
            borderRadius: 6,
            padding: 10,
            textAlignVertical: 'top'
          }}
          value={description}
          onChangeText={setDescription}
          placeholder='Add a detailed description of your listing'
          multiline
        />
      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <ButtonComponent
          title="Post"
          onPress={handlePost}
        />
      </View>
    </View>
  );
};

function TextEntryForm(props) {
  const { placeholder, value, onChange, secureTextEntry, style } = props;
  return (
    <View>
      <TextInput
        style={[styles.input, style]}
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

export default ShareScreen;
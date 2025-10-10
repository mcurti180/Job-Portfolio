import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleQuery = (query) => {
    if(query.trim() === ''){
      console.log('Please enter a city to search');
    }
    else{
      setSearchQuery(query)
      console.log(searchQuery)
    }
  }

  return (
    <View style = {mapStyles.container}>
      <TextInput
        style = {mapStyles.searchBar}
        placeholder='Search...'
        value={searchQuery}
        onChangle={handleQuery}
      />
    </View>
  )
}

const mapStyles = StyleSheet.create({
  
})

const MapScreen = ({navigation}) => {
    return (
      <View>
        <Text>This is the Map Screen</Text>
        <SearchBar/>
      </View>
    );
  }

export default MapScreen;
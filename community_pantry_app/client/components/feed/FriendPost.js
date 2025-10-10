import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';

const FriendPost = (props) => (
  <View style={friendPostStyles.layout}>
    <Image style={friendPostStyles.image} source={{ uri: props.image }} />
    <View style={friendPostStyles.content}>
      <Text style={friendPostStyles.title}>{props.title}</Text>

      {/* Add category here */}
      {props.category && (
        <Text style={friendPostStyles.category}>{props.category}</Text>
      )}

      <Text style={friendPostStyles.description}>{props.description}</Text>
    </View>
  </View>
);

const friendPostStyles = StyleSheet.create({
  layout: {
    marginLeft: 12,
    flexDirection: 'row',
    marginVertical: 8,
  },
  image: {
    borderRadius: 12,
    flex: 1,
  },
  content: {
    flex: 2,
    paddingLeft: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    paddingBottom: 4,
    color: '#280D5F',
  },
  category: {
    fontSize: 10,
    color: '#888',        // lighter color so it’s subtle
    paddingBottom: 4,
    fontStyle: 'italic',
  },
  description: {
    color: '#280D5F',
  },
});


export default FriendPost;
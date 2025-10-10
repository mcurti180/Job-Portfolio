import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import Avatar from '../common/Avatar';
import Title from '../common/Title';

const FriendCard = ({ name, avatar, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={friendCardStyles.card}>
      <Avatar url={avatar} />
      <View style={{ marginTop: 8 }}>
        <Title>{name}</Title>
      </View>
    </View>
  </TouchableOpacity>
);

const friendCardStyles = StyleSheet.create({
  card: {
    padding: 12,
    marginRight: 16,
    width: 88,
    height: 122,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: '#E7E3EB',
    backgroundColor: '#FFFFFF'
  },
  title: {
    textAlign: 'right',

  },
});

export default FriendCard;


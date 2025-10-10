import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import styles from '../../styles/Styles';

const Title = (props) => (
    <Text style={styles.title}>
      {props.children}
    </Text>
  );

export default Title;
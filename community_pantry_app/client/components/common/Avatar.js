import { Image } from 'react-native';
import styles from '../../styles/Styles';

const Avatar = (props) => (
    <Image
      style={styles.avatar}
      source={{ uri: props.url }}
    />
  );

export default Avatar;
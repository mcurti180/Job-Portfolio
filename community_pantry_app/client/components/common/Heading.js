import { Text } from 'react-native';

const Heading = (props) => (
    <Text style={styles.heading}>
      {props.children}
    </Text>
  );

  export default Heading;
  
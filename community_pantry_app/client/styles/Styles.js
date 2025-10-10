import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%',
  },
  image_logo: {
    width: '80%',
    height: 80,
    resizeMode: 'contain',        // allow it to scale properly
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  register: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginLeft: 10
  },
  input: {
    padding: 8,
    fontSize: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'blue',
    marginBottom: 8
  },
  textInputGenertic: {
    borderColor: 'blue',
    marginRight: 8,
    marginBotton: 8,
    borderRadius: 12,
    borderWidth: 2,
  },
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '25%'
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    //borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: '50%',
    borderWidth: 2,
    borderColor: 'red'
  },
  heading: {
    backgroundColor: 'green',
    height: 50,
    width: 350,
    fontStyle: 'Kanit',
    fontWeight: 600,
    fontSize: 20,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  title: {
    color: '#280D5F',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    textAlign: 'center'
  },

});

export default styles;
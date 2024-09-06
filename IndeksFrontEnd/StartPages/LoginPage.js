import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginPage = () => {
    const navigation = useNavigation();

    const handleRegisterPress = () => {
        console.log("Radi")
        navigation.navigate('Register');
        
      };
      const handleLoginPress = () => {
        console.log("Radi")
        navigation.navigate('ChatList');
        
      };
  return (
    <ImageBackground 
      source={require('../pictures/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Image 
          source={require('../pictures/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.indexText}>INDEKS</Text>
        <Text style={styles.title}>Prijava</Text>
        <TextInput 
          placeholder="Korisničko ime" 
          style={styles.input}
          placeholderTextColor="#919191"
        />
        <TextInput 
          placeholder="Lozinka" 
          style={styles.input} 
          placeholderTextColor="#919191"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress} >
          <Text style={styles.loginText} >Prijavi se</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.loginLink}>
        <Text style={styles.loginText}>
            Nemate nalog? <Text style={styles.loginLinkBold} onPress={handleRegisterPress}>  Kreiraj nalog</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
     backgroundColor: '#223364'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop : 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily :  '',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: -250, 
    marginBottom :10,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: '#000000',
    backgroundColor : "#ffffff"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginVertical: 20,
  },
  line: {
    width: '100%',
    height: 6,
    backgroundColor: '#013868', 
   // borderRadius: 10,
    marginBottom : -20,
    marginTop : 0
    
  },

  loginButton: {
    width: '65%',
    height: 50,
    backgroundColor: '#013868',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 20,
    marginTop:40
  },
  loginText: {
    color: '#ffffff',
    fontSize: 18,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#ffffff',
    marginTop : 0
    //textDecorationLine: 'underline',
  },
  indexText: {
    fontSize: 40, 
    fontFamily : 'MarkerFelt-Thin',
    color: '#013868', 
    marginBottom: 100, 
    marginTop : -30,
    borderRadius : 20
  },
  loginLinkBold: {
    color: '#013868', // Plava boja
    fontWeight: 'bold',
    fontSize : 18
  },
});

export default LoginPage;

import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  static async saveToken(token) {
    try {
      await AsyncStorage.setItem('jwtToken', token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Error', error);
    }
  }

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        return token;
      } else {
        console.log('No token found');
        return null;
      }
    } catch (error) {
      console.error('Failed to fetch the token.', error);
      return null;
    }
  }

  static async removeToken() {
    try {
      await AsyncStorage.removeItem('jwtToken');
    } catch (error) {
      console.error('Failed to delete the token.', error);
    }
  }
}

export default TokenService;

import React, { useRef, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const translateX = useRef(new Animated.Value(-350)).current; 

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -350, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  const onClose2 =() =>
  {
    onClose();
    translateX.setValue(-350);
  }
  const handleChatPress = () => {
    onClose();
    navigation.navigate('ChatList');
  };

  const handleMaterijaliPress = () => {
    onClose();
    navigation.navigate('Materijali');
  };

  const handleRasporedPress = () => {
    onClose();
    navigation.navigate('Schedule');
  };

  const handleInstructionPress = () => {
    onClose();
    navigation.navigate('Instruction');
  };

  const handleOsnovneGrupe = () => {
    onClose();
    navigation.navigate('OsnovneGrupeScreen');
  };

  const handleLogoutPress = () => {
    onClose();
    navigation.navigate('Login');
  };

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.sidebarOverlay}>
        <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX }] }]}>
          <View style={styles.sidebarProfileSection}>
            <TouchableOpacity onPress={onClose2} style={styles.sidebarCloseButton}>
              <Icon name="bars" size={30} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.sidebarProfilePicture}>
              <Icon name="user" size={80} color="#0b4b85" />
            </View>
            <View style={styles.sidebarProfileDetails}>
              <Text style={styles.sidebarName}>Milan Iliskovic</Text>
              <Text style={styles.sidebarEmail}>milan.iliskovic@student.etf.unibl.org</Text>
            </View>
          </View>
          <View style={styles.sidebarMenuSection}>
            <ScrollView style={styles.sidebarMenu}>
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleChatPress}>
                <Icon name="comments" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Aktivni razgovori</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleMaterijaliPress}>
                <Icon name="folder" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Materijali</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleRasporedPress}>
                <Icon name="calendar" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Raspored</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarMenuItem}>
                <Icon name="bullhorn" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Oglasi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleInstructionPress}>
                <Icon name="book" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Instrukcije</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleOsnovneGrupe}>
                <Icon name="users" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Osnovne grupe</Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={[styles.sidebarMenuItem, styles.sidebarLogout]} onPress={handleLogoutPress}>
              <Icon name="sign-out" size={25} color="#ff4b5c" />
              <Text style={[styles.sidebarMenuText, { color: '#ff4b5c' }]}>Odjavi se</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sidebarContainer: {
    width: 330,
    height: '100%',
    backgroundColor: '#fff',
    padding: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100, 
  },
  sidebarCloseButton: {
    paddingTop: 30,
    alignItems: 'flex-end',
    marginBottom: 20,
    backgroundColor: '#013868',
    width: '100%',
    paddingRight: 20,
  },
  sidebarProfileSection: {
    backgroundColor: '#013868',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  sidebarProfilePicture: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#ffffff',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarProfileDetails: {
    padding: 20,
    alignItems: 'center',
  },
  sidebarName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sidebarEmail: {
    color: '#dddddd',
  },
  sidebarMenuSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  sidebarMenu: {
    flex: 1,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7C7',
  },
  sidebarMenuText: {
    color: '#007BFF',
    fontSize: 18,
    marginLeft: 15,
  },
  sidebarLogout: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#007BFF',
    paddingTop: 10,
    borderBottomWidth: 0,
  },
});

export default Sidebar;

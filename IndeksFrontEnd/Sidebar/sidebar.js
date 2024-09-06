import React from 'react';
import { Modal, View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import according to the icon library you use
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Sidebar = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleChatPress = () => {
    //console.log('milan')
    onClose();
    navigation.navigate('ChatList');
    };
    const handleMaterijaliPress = () => {
      //console.log('milan')
      onClose()
      navigation.navigate('Materijali');
      };
    const handleRasporedPress = () => {
      //console.log('milan')
      onClose()
      navigation.navigate('Schedule');
      };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.sidebarOverlay}>
        <View style={styles.sidebarContainer}>
         
          <View style={styles.sidebarProfileSection}>
             <TouchableOpacity onPress={onClose} style={styles.sidebarCloseButton}>
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
              <TouchableOpacity style={styles.sidebarMenuItem}>
                <Icon name="book" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Instrukcije</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarMenuItem}>
                <Icon name="users" size={25} color="#013868" />
                <Text style={styles.sidebarMenuText}>Osnovne grupe</Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={[styles.sidebarMenuItem, styles.sidebarLogout]}>
              <Icon name="sign-out" size={25} color="#ff4b5c" />
              <Text style={[styles.sidebarMenuText, { color: '#ff4b5c' }]}>Odjavi se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start', // Aligns the overlay to the left
  },
  sidebarContainer: {
    width: 350, // Adjust width as needed
    height: '100%',
    padding: 0,
    position: 'absolute', // Position the container absolutely
    left: 0, // Align the container to the left
    top: 0, // Ensure it starts from the top
    bottom: 0, // Ensure it extends to the bottom
  },
  sidebarCloseButton: {
    paddingTop : 30,
    alignItems: 'flex-end',
    marginBottom: 20,
    backgroundColor: '#013868', // Blue background color for close button area
    padding: 10,
    left : 140
  },
  sidebarProfileSection: {
    backgroundColor: '#013868', // Blue background color for the profile section
    padding: 15,
    alignItems: 'center', // Center the profile picture and details
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff', // Optional: add a border below the profile section
  },
  sidebarProfilePicture: {
    marginBottom: 10, // Space between picture and details
    backgroundColor: '#ffffff', // Background color inside the circle
    borderRadius: 100, // Ensure this is half of the width/height to make it a circle
    borderWidth: 3, // Thickness of the border
    borderColor: '#ffffff', // Color of the border
    width: 120, // Width of the container
    height: 120, // Height of the container
    justifyContent: 'center', // Center the content
    alignItems: 'center', // Center the content
  },
  sidebarProfileDetails: {
    padding : 20,
    alignItems: 'right', // Center the profile details below the picture
    right : 20,
    marginBottom : -10
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
    backgroundColor: '#ffffff', // White background color for the menu section
    padding: 20,
    
  },
  sidebarMenu: {
    flex: 1,
    
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8, // Adjust padding as needed
    marginBottom: 15,
    paddingHorizontal: -100,
    borderBottomWidth: 1, // Use borderBottomWidth to create a line under each item
    borderBottomColor: '#007BFF', // Color of the line
    borderBottomColor : '#C7C7C7'

  },
  sidebarMenuText: {
    color: '#007BFF',
    fontSize: 18, // Adjust font size as needed
    marginLeft: 15, // Adjust margin as needed
  },
  sidebarLogout: {
    marginTop: 'auto', // Ensure logout button is at the bottom
    borderTopWidth: 1,
    borderTopColor: '#007BFF', 
    paddingTop: 10,
    borderBottomWidth: 0,
  },
});

export default Sidebar;

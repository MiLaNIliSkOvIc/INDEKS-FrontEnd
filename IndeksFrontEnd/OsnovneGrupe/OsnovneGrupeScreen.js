import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from '@react-native-community/blur';
import Sidebar from '../Sidebar/sidebar';

const data = [
  { id: '1', title: 'Prva godina', description: '' },
  { id: '2', title: 'Druga godina', description: 'Računarstvo i informatika' },
  { id: '3', title: 'Druga godina', description: 'Elektronika i telekomunikacije' },
  { id: '4', title: 'Druga godina', description: 'Elektroenergetika i automatika' },
  { id: '5', title: 'Treća godina', description: 'Računarstvo i informatika' },
  { id: '6', title: 'Treća godina', description: 'Elektronika i telekomunikacije' },
  { id: '7', title: 'Treća godina', description: 'Elektroenergetika i automatika' },
  { id: '8', title: 'Četvrta godina', description: 'Računarstvo i informatika' },
  { id: '9', title: 'Četvrta godina', description: 'Elektronika i telekomunikacije' },
  { id: '10', title: 'Četvrta godina', description: 'Elektroenergetika i automatika' },
];

const OsnovneGrupeScreen = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [blurredItem, setBlurredItem] = useState(null); // Track which item is blurred

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLongPress = (item) => {
    setBlurredItem(item.id);
  };

  const handleClose = () => {
    setBlurredItem(null); // Remove blur when the close button is pressed
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onLongPress={() => handleLongPress(item)}>
      <View style={styles.cardContainer}>
        {/* Apply blur effect if this item is long-pressed */}
        {blurredItem === item.id ? (
          <BlurView
            style={styles.absoluteBlur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          >
            <View style={styles.iconOverlayContainer}>
              {/* Close (X) icon */}
              <TouchableOpacity onPress={handleClose}>
                <View style={styles.iconCircle}>
                  <Icon name="close" size={15} color="#fff" />
                </View>
              </TouchableOpacity>
              {/* Alert (!) icon */}
              <TouchableOpacity>
                <View style={styles.iconCircle}>
                  <Icon name="exclamation" size={15} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : null}

        {/* Item content */}
        <View style={styles.iconContainer}>
          <Icon name="group" size={30} color="#013868" /> 
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          {item.description ? <Text style={styles.descriptionText}>{item.description}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => toggleSidebar()}>
        <Icon name="bars" size={25} color="#fff" />
      </TouchableOpacity>
      <Image source={require('../pictures/logo.png')} style={styles.headerLogo} resizeMode="contain" />
      <Text style={styles.headerTitle}>INDEKS</Text>
      <TouchableOpacity>
        <Icon name="search" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.screenTitle}>Osnovne grupe</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardList}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7c7c7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#013868',
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7C7',
  },
  headerLogo: {
    width: 100,
    height: 40,
    marginRight : 20
  
  },
  headerTitle: {
    marginRight:40,
    marginLeft : -100,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#013868',
    textAlign: 'center',
    marginVertical: 10,
  },
  cardList: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    position: 'relative', // for absolute positioning of blur
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#013868',
  },
  descriptionText: {
    fontSize: 14,
    color: '#737373',
  },
  floatingButton: {
    position: 'absolute',
    right: 30,
    bottom: 60,
    width: 60,
    height: 60,
    backgroundColor: '#013868',
    borderRadius: 30,
    justifyContent: 'center',  
    alignItems: 'center',     
    elevation: 8,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',       
    lineHeight: 33,   
  },
  absoluteBlur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  iconOverlayContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  iconCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#013868',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default OsnovneGrupeScreen;

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Sidebar from '../Sidebar/sidebar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', year: 'I', title: 'Prva godina', lecturer: 'Milan Iliskovic' },
  { id: '2', year: 'II', title: 'Druga godina', lecturer: 'Igor Piljagic' },
  { id: '3', year: 'III', title: 'Treća godina', lecturer: 'Dejan Janjic' },
  { id: '4', year: 'IV', title: 'Četvrta godina', lecturer: 'Tijana Lazendic' },
];

const MaterialsScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const navigation = useNavigation();

  const handleItemPress = (id) => {
    navigation.navigate('PrvaGodina', { title: data.find(item => item.id === id).title });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item.id)}
    >
      <View style={styles.iconContainer}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{item.year}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleSidebar}>
      <Icon name="bars" size={28} color="#fff" />
      </TouchableOpacity>
      <Image source={require('../pictures/logo.png')} style={styles.headerLogo} resizeMode="contain" />
      <Text style={styles.headerText}>Indeks</Text>
      <TouchableOpacity>
        <Image source={require('../pictures/search.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Materijali</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#013868',
    paddingTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerLogo: {
    width: 100,
    height: 40,
    marginRight : 20
  
  },
  headerText: {
    marginRight:30,
    marginLeft : -100,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#013868',
    textAlign: 'center',
    marginVertical: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  numberCircle: {
    backgroundColor: '#E8EAF6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#013868',
  },
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#013868',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
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
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default MaterialsScreen;

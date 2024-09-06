import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Sidebar from '../Sidebar/sidebar';
import Icon from 'react-native-vector-icons/FontAwesome';

const data = [
  { id: '1', logo: 'M', title: 'Matematika 1' },
  { id: '2', logo: 'F', title: 'Fizika' },
  { id: '3', logo: 'E', title: 'ElektroTehnika' },
  { id: '4', logo: 'O', title: 'Osnovi racunarske tehnike' },
];

const GodinaScreen = ({route}) => {
    const { title } = route.params; 
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      //console.log("milan")
      setSidebarVisible(!isSidebarVisible);
    };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{item.logo}</Text>
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleSidebar}>
      <Icon name="bars" size={30} color="#888" style={styles.headerIcon} />
      </TouchableOpacity>
      <Image source={require('../pictures/logo.png')} style={styles.headerLogo} resizeMode="contain" />
      <Text style={styles.headerText}>Indeks</Text>
      <TouchableOpacity>
        <Image source={require('../pictures/search.png')} style={styles.headerIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{title}</Text>
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
    backgroundColor: '#DCDCDC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DCDCDC',
    paddingTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C7C7C7',
  },
  headerIcon: {
    width: 50,
    height: 40,
    paddingTop : 8,
    right : -7
  },
  headerLogo: {
    width: 100,
    height: 40,
    marginRight: -100,
    
  },
  headerText: {
    paddingTop:5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#013868',
    right : -10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
     borderBottomWidth: 1,
    borderBottomColor : '#C7C7C7',
    borderTopWidth : 1,
    borderTopColor : '#C7C7C7',

  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
   
  },
  iconText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DCDCDC',
  },

  itemText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#555',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    width: 80,
    height: 80,
    backgroundColor: '#013868',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    top : -3,
    left :1
    
  },
});

export default GodinaScreen;

import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from 'expo-blur'; 
import Sidebar from '../Sidebar/sidebar';
import HeaderComponent from '../Header/Header';
import HttpService from '../HttpService/httpService';
import ElementaryGroup from '../model/ElementaryGroup';

// const data = [
//   { id: '1', title: 'Prva godina', description: '' },
//   { id: '2', title: 'Druga godina', description: 'Računarstvo i informatika' },
//   { id: '3', title: 'Druga godina', description: 'Elektronika i telekomunikacije' },
//   { id: '4', title: 'Druga godina', description: 'Elektroenergetika i automatika' },
//   { id: '5', title: 'Treća godina', description: 'Računarstvo i informatika' },
//   { id: '6', title: 'Treća godina', description: 'Elektronika i telekomunikacije' },
//   { id: '7', title: 'Treća godina', description: 'Elektroenergetika i automatika' },
//   { id: '8', title: 'Četvrta godina', description: 'Računarstvo i informatika' },
//   { id: '9', title: 'Četvrta godina', description: 'Elektronika i telekomunikacije' },
//   { id: '10', title: 'Četvrta godina', description: 'Elektroenergetika i automatika' },
// ];

const ElementaryGroupChatScreen = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [blurredItem, setBlurredItem] = useState(null); 
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await HttpService.get('elementaryGroup'); 
        const formattedData = result.map(item => new ElementaryGroup(
          item.groupChat.id,
          item.groupChat.name
        ));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLongPress = (item) => {
    setBlurredItem(item.id);
  };

  const handleClose = () => {
    setBlurredItem(null); 
  };

  const handleOutsidePress = () => {
    setBlurredItem(null); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onLongPress={() => handleLongPress(item)}>
      <View style={styles.cardContainer}>
   
        {blurredItem === item.id ? (
          <BlurView
            style={styles.absoluteBlur}
            intensity={50}
          >
            <View style={styles.iconOverlayContainer}>
             
              <TouchableOpacity onPress={handleClose}>
                <View style={styles.iconCircle}>
                  <Icon name="close" size={15} color="#fff" />
                </View>
              </TouchableOpacity>
             
              <TouchableOpacity>
                <View style={styles.iconCircle}>
                  <Icon name="exclamation" size={15} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        ) : null}

        
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


  //ovo je se poziva da se vrti ono pri dohvacanju iz baze
  const loading = () => {
    if (isLoading) {
      return (
        <ActivityIndicator size="large" color="#013868" style={styles.loadingIndicator} />
      );
    } else {
      return (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.cardList}
        />
      );
    }
  };


  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
        <Text style={styles.screenTitle}>Osnovne grupe</Text>
      {loading()}
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
        <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
      </View>
    </TouchableWithoutFeedback>
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
    marginRight: 20,
  },
  headerTitle: {
    marginRight: 40,
    marginLeft: -100,
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
    position: 'relative', 
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
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 7, 
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#013868',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3, 
  },
  loadingIndicator: {
    marginTop: 300,
  },
});

export default ElementaryGroupChatScreen;

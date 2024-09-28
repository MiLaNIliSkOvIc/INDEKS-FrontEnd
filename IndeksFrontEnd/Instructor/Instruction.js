import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import Sidebar from '../Sidebar/sidebar';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', course: 'Matematika 1', teacher: 'Milan Iliskovic', rating: 5, icon: 'calculator' },
  { id: '2', course: 'OET 1', teacher: 'Igor Piljagic', rating: 5, icon: 'bolt' },
  { id: '3', course: 'Matematika 2', teacher: 'Dejan Janjic', rating: 4, icon: 'calculator' },
  { id: '4', course: 'Programiranje 1', teacher: 'Tijana Lazendic', rating: 4, icon: 'code' },
  { id: '5', course: 'Matematika 4', teacher: 'Mihajlo Seva', rating: 3, icon: 'calculator' },
  { id: '6', course: 'OET 2', teacher: 'Marko Grabas', rating: 3, icon: 'bolt' },
  { id: '7', course: 'Diskretna matematika', teacher: 'Srdjan Grujic', rating: 3, icon: 'calculator' },
  { id: '8', course: 'Programiranje 2', teacher: 'Tijana Lazendic', rating: 2, icon: 'code' },
  { id: '9', course: 'Programski jezici 1', teacher: 'Dejan Janjic', rating: 4, icon: 'code' },
  { id: '10', course: 'OEiDT', teacher: 'Marko Grabas', rating: 3, icon: 'bolt' },
];

const CourseItem = ({ course, teacher, rating, icon }) => {
  const navigation = useNavigation();

  const renderStars = () => {
   //console.log(course)
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon key={i} name={i <= rating ? 'star' : 'star-o'} size={26} color="#A9A9A9" /> 
      );
    }
    return stars;
  };

  const CourseInfo = (course) => {
    console.log(course)
    //ovde cemo zvati http service
    const courseData = {
      courseTitle: course,
      instructor: 'Milan Iliskovic',
      description: 'Zovem se Milan i drzacu vam instrukcije iz matematike 1.',
    };
    navigation.navigate('InstructionInfo', { ...courseData });
  };
  
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => CourseInfo(course)}>
      <View style={styles.courseIconContainer}>
        <Icon name={icon} size={28} color="#013868" />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course}</Text>
        <Text style={styles.teacherName}>{teacher}</Text>
      </View>
      <View style={styles.ratingContainer}>{renderStars()}</View>
    </TouchableOpacity>
  );
};

const Instruction = () => {
  
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleCoursePress = (course) => {
    console.log("Selected course:", course);
    // Add logic for navigation or displaying more course information
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleSidebar}>
          <Icon name="bars" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image 
            source={require('../pictures/logo.png')}  
            style={styles.logo}
          />
          <Text style={styles.logoText}>INDEKS</Text>  
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Instrukcije</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CourseItem
            course={item.course}
            teacher={item.teacher}
            rating={item.rating}
            icon={item.icon}
            onPress={() => handleCoursePress(item.course)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

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
    paddingHorizontal: 20,
    paddingVertical: 8,  
  },
  iconButton: {
    marginTop: 30, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30, 
    marginRight : 20
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#013868',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  courseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  teacherName: {
    fontSize: 14,
    color: '#555',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default Instruction;

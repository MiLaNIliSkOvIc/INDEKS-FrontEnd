import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const courseData = {
    courseTitle: 'Matematika 1',
    instructor: 'Ime Prezime Instruktora',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };
  const reviews = [
    { id: '1', user: 'Marko Petrović', comment: 'Sve preporuke', rating: 5 },
    { id: '2', user: 'Jelena Jovanović', comment: 'Profesionalno, jasno', rating: 4 },
    { id: '3', user: 'Nikola Nikolić', comment: 'Nije loše', rating: 3 },
    { id: '4', user: 'Milica Stojanović', comment: 'Odlično iskustvo!', rating: 5 },
    { id: '5', user: 'Stefan Đorđević', comment: 'Dobar proizvod', rating: 4 },
    { id: '6', user: 'Ana Ilić', comment: 'Moglo bi biti bolje', rating: 3 },
    { id: '7', user: 'Ivana Vasić', comment: 'Sjajna usluga', rating: 5 },
    { id: '8', user: 'Miloš Kostić', comment: 'Nije ispunilo očekivanja', rating: 2 },
    { id: '9', user: 'Dragana Mitrović', comment: 'Preporučujem svima', rating: 4 },
    { id: '10', user: 'Vladimir Pavlović', comment: 'Nezadovoljan sam', rating: 1 },
  ];

const InstructionInfo = ({route}) => {
    const { courseTitle, instructor, description } = route.params; 
    const navigation = useNavigation();

    const back = () => {
            navigation.navigate('Instruction'); 
    }

  const renderStars = (rating) => {
    
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-border'}
          size={24}
          color={i <= rating ? '#c7c7c7' : '#ccc'}
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Icon name="person" size={40} color="#888" style={styles.userIcon} />
      <View style={styles.reviewTextContainer}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
      <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={back}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../pictures/logo.png')} style={styles.logo} />
          <Text style={styles.title}>INDEKS</Text>
        </View>
      </View>

      <View style={styles.content}>
     
        <View style={styles.courseInfoContainer}>
          <View style={styles.courseHeader}>
            <Icon name="menu-book" size={50} color="#003366" style={styles.courseIcon} />
            <View>
              <Text style={styles.courseTitle}>{courseTitle}</Text>
              <Text style={styles.instructor}>{instructor}</Text>
            </View>
          </View>

        
          <Text style={styles.sectionTitle}>Opis</Text>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Recenzije</Text>
        <FlatList data={reviews} renderItem={renderReview} keyExtractor={(item) => item.id} />
      </View>
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
    alignItems: 'center',
    backgroundColor: '#003366', 
    width: '100%', 
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10, 
  },
  backButton: {
    padding: 10,
    marginTop: 20, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30, 
    marginRight:130
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
  
  content: {
    flex: 1,
    padding: 16, 
  },
  courseInfoContainer: {
    marginVertical: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIcon: {
    marginRight: 15,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructor: {
    color: '#888',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  reviewTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  userName: {
    fontWeight: 'bold',
    color: '#003366', 
  },
  comment: {
    color: '#555',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginHorizontal: 2,
  },
});

export default InstructionInfo;

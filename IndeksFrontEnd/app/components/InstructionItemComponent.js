import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const InstructionItemComponent = ({ course, teacher, rating, icon }) => {
  const navigation = useNavigation();

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={26}
          color="#A9A9A9"
        />
      );
    }
    return stars;
  };

  const CourseInfo = (course) => {
    console.log(course);
    //ovde cemo zvati http service
    const courseData = {
      courseTitle: course,
      instructor: "Milan Iliskovic",
      description: "Zovem se Milan i drzacu vam instrukcije iz matematike 1.",
    };
    navigation.navigate("InstructionInfo", { ...courseData });
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => CourseInfo(course)}
    >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7c7c7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#013868",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  iconButton: {
    marginTop: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginRight: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  logoText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#013868",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  courseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
  },
  courseInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  teacherName: {
    fontSize: 14,
    color: "#555",
  },
  ratingContainer: {
    flexDirection: "row",
  },
});

export default InstructionItemComponent;

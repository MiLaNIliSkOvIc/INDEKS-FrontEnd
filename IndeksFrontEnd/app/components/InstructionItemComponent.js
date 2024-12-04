import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const InstructionItemComponent = ({ navigate, course, teacher, rating, icon }) => {
  const navigation = useNavigation();
  const [showActions, setShowActions] = useState(false);

  const renderStars = () => {
    if (showActions) return null; // Sakrij zvezdice ako su dugmad za akcije vidljiva
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
    // Podaci za novu rutu
    const courseData = {
      courseTitle: course,
      instructor: teacher,
      description: "Zovem se Milan i držaću vam instrukcije iz matematike 1.",
    };

    // Navigacija sa nazivom rute
    navigation.navigate("InstructionInfo", { navigate, ...courseData });
  };

  const handlePressOutside = () => {
    setShowActions(false); // Sakrij dugmad za akcije i prikaži zvezdice
  };

  return (
    <TouchableWithoutFeedback
      onPress={handlePressOutside}
      accessible={false}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <TouchableOpacity
          style={[
            styles.itemContainer,
            showActions && styles.blurredContainer,
          ]}
          onPress={() => CourseInfo(course)} // Omogući klik na karticu
          onLongPress={() => setShowActions(true)}
        >
          {/* Ikona kursa */}
          <View style={styles.courseIconContainer}>
            <Icon name={icon} size={28} color="#013868" />
          </View>

          {/* Informacije o kursu */}
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course}</Text>
            <Text style={styles.teacherName}>{teacher}</Text>
          </View>

          {/* Zvezdice za ocenu */}
          <View style={styles.ratingContainer}>{renderStars()}</View>

          {/* Dugmad za akcije */}
          {showActions && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setShowActions(false)}
              >
                <Icon name="close" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => console.log("Alert triggered!")}
              >
                <Icon name="exclamation" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
  },
  blurredContainer: {
    backgroundColor: "#EDEDED",
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
  actionButtons: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    top: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#013868",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default InstructionItemComponent;

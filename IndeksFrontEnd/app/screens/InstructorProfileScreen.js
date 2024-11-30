//TODO tijana
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import InstructionItemComponent from "../components/InstructionItemComponent";

const data = [
  {
    id: "1",
    course: "Matematika 1",
    
    rating: 5,
    icon: "calculator",
  },
  {
    id: "2",
    course: "OET 1",
   
    rating: 5,
    icon: "bolt",
  },
  {
    id: "3",
    course: "Matematika 2",
   
    rating: 4,
    icon: "calculator",
  },
 
];
const InstructorProfileScreen = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
 };
 const handleCoursePress = (course) => {
    console.log("Selected course:", course);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.title}>Moja ponuda</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <InstructionItemComponent
            course={item.course}
            rating={item.rating}
            teacher={"444 recenzije"} //todo dodati recenzije tj prebrojavanje
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
      backgroundColor: "#c7c7c7",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#013868",
      },
    });

export default InstructorProfileScreen;

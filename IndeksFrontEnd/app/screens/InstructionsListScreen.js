import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import InstructionItemComponent from "../components/InstructionItemComponent";

const data = [
  {
    id: "1",
    course: "Matematika 1",
    teacher: "Milan Iliskovic",
    rating: 5,
    icon: "calculator",
  },
  {
    id: "2",
    course: "OET 1",
    teacher: "Igor Piljagic",
    rating: 5,
    icon: "bolt",
  },
  {
    id: "3",
    course: "Matematika 2",
    teacher: "Dejan Janjic",
    rating: 4,
    icon: "calculator",
  },
  {
    id: "4",
    course: "Programiranje 1",
    teacher: "Tijana Lazendic",
    rating: 4,
    icon: "code",
  },
  {
    id: "5",
    course: "Matematika 4",
    teacher: "Mihajlo Seva",
    rating: 3,
    icon: "calculator",
  },
  {
    id: "6",
    course: "OET 2",
    teacher: "Marko Grabas",
    rating: 3,
    icon: "bolt",
  },
  {
    id: "7",
    course: "Diskretna matematika",
    teacher: "Srdjan Grujic",
    rating: 3,
    icon: "calculator",
  },
  {
    id: "8",
    course: "Programiranje 2",
    teacher: "Tijana Lazendic",
    rating: 2,
    icon: "code",
  },
  {
    id: "9",
    course: "Programski jezici 1",
    teacher: "Dejan Janjic",
    rating: 4,
    icon: "code",
  },
  {
    id: "10",
    course: "OEiDT",
    teacher: "Marko Grabas",
    rating: 3,
    icon: "bolt",
  },
];


const InstructionsListScreen = () => {
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

      <Text style={styles.title}>Instrukcije</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <InstructionItemComponent
          navigate={"Instruction"}
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
    backgroundColor: "#c7c7c7",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#013868",
  }
});

export default InstructionsListScreen;

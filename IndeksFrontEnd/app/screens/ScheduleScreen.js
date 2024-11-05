import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Sidebar from "../components/SidebarComponent";
import "react-native-gesture-handler";
import HttpService from "../services/HttpService";

const days = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
const times = [
  "8:15",
  "9:15",
  "10:15",
  "11:15",
  "12:15",
  "13:15",
  "14:15",
  "15:15",
  "16:15",
  "17:15",
  "18:15",
  "19:15",
  "20:15",
  "21:15",
  "22:15",
];
const dayMapping = {
  Pon: 0,
  Uto: 1,
  Sri: 2,
  Čet: 3,
  Pet: 4,
  Sub: 5,
  Ned: 6,
};

const ScheduleScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [editingCell, setEditingCell] = useState({
    timeIndex: null,
    dayIndex: null,
  });
  const [scheduleData, setScheduleData] = useState(
    Array(times.length).fill(Array(days.length).fill(""))
  );
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const handleResize = () => {
      setDimensions(Dimensions.get("window"));
    };
    
    Dimensions.addEventListener("change", handleResize);

    return () => {
      //Dimensions.removeEventListener("change", handleResize);
    };
  }, []);

  
  useEffect(() => {
    const fetchScheduleData = async (scheduleId) => {
      try {
        const data = await HttpService.get(`schedule/${scheduleId}/items`);
        const initialSchedule = Array(times.length)
          .fill(null)
          .map(() => Array(days.length).fill(""));
  
        
        data.forEach((item) => {
          const dayIndex = item.day;
          const timeIndex = times.indexOf(item.time);
          if (timeIndex !== -1 && dayIndex >= 0 && dayIndex < days.length) {
            initialSchedule[timeIndex][dayIndex] = item.content || "";
          }
        });
  
        setScheduleData(initialSchedule);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        const fallbackSchedule = Array(times.length)
          .fill(null)
          .map(() => Array(days.length).fill(""));
        setScheduleData(fallbackSchedule);
      }
    };
  
    const scheduleId = 5; // Ovde moracemo dobaviti userov id vjerovatno cemo kroz token
    fetchScheduleData(scheduleId);
  }, []);
  

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleTextChange = (timeIndex, dayIndex, text) => {
    const updatedSchedule = scheduleData.map((row, rowIndex) =>
      rowIndex === timeIndex
        ? row.map((item, columnIndex) =>
            columnIndex === dayIndex ? text : item
          )
        : row
    );
    setScheduleData(updatedSchedule);
  };


  const handleEndEditing = async (timeIndex, dayIndex) => {
    const text = scheduleData[timeIndex][dayIndex] || "";
    const payload = {
      id: 5,
      day: dayMapping[days[dayIndex]],
      time: times[timeIndex],
      content: text,
      scheduleId: 5, //Moracemo nekako cuvati idSchedule vezanog za usera
    };
  
    console.log("Saljemoo:", payload); // nesto moje da provjerim sta se salje na backend
  
    try {
      await HttpService.create("scheduleItem", payload);
    } catch (error) {
      console.error("Error saving schedule data:", error);
    }
  };
  

  const handleCellPress = (timeIndex, dayIndex) => {
    setEditingCell({ timeIndex, dayIndex });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="bars" size={30} color="#888" style={styles.headerIcon} />
        </TouchableOpacity>
        <Image
          source={require("../assets/logo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Raspored</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/search.png")}
            style={styles.headerEditIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        minimumZoomScale={0.5}
        maximumZoomScale={3}
        pinchGestureEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          pinchGestureEnabled={true}
        >
          <View>
            <View style={styles.daysRow}>
              <Text style={styles.timeColumnHeader}>Vrijeme</Text>
              {days.map((day, index) => (
                <View key={index} style={styles.dayCell}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              ))}
            </View>

            {times.map((time, timeIndex) => (
              <View key={timeIndex} style={styles.row}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>{time}</Text>
                </View>
                {days.map((_, dayIndex) => (
                  <TouchableWithoutFeedback
                    key={dayIndex}
                    onPress={() => handleCellPress(timeIndex, dayIndex)}
                  >
                    <View style={styles.scheduleCell}>
                      {editingCell.timeIndex === timeIndex &&
                      editingCell.dayIndex === dayIndex ? (
                        <TextInput
                          style={[
                            styles.input,
                            { width: dimensions.width > 600 ? "95%" : "90%" },
                          ]}
                          multiline={true}
                          scrollEnabled={true}
                          value={
                            scheduleData[timeIndex] &&
                            scheduleData[timeIndex][dayIndex]
                          }
                          onChangeText={(text) =>
                            handleTextChange(timeIndex, dayIndex, text)
                          }
                          onEndEditing={() =>
                            handleEndEditing(timeIndex, dayIndex)
                          }
                          autoFocus={true}
                        />
                      ) : (
                        <Text style={styles.cellText}>
                          {(scheduleData[timeIndex] &&
                            scheduleData[timeIndex][dayIndex]) ||
                            " "}
                        </Text>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7C7C7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#C7C7C7",
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  headerLogo: {
    width: 50,
    height: 40,
    marginRight: -70,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#013868",
  },
  headerEditIcon: {
    width: 40,
    height: 40,
  },
  daysRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#013868",
  },
  timeColumnHeader: {
    width: 120,
    textAlign: "center",
    paddingVertical: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  dayCell: {
    flex: 1,
    minWidth: 120,
    paddingVertical: 10,
    alignItems: "center",
  },
  dayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  timeCell: {
    width: 120,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C7C7C7",
    borderRightColor: "#fff",
    borderRightWidth: 1,
  },
  timeText: {
    fontWeight: "bold",
  },
  scheduleCell: {
    width: 120,
    height: 100,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    backgroundColor: "#C7C7C7",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    textAlignVertical: "top",
  },
});

export default ScheduleScreen;

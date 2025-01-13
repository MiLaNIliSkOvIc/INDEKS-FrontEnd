import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import HttpService from "../services/HttpService";
import Icon from "react-native-vector-icons/MaterialIcons";

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
const options = [
  { label: "Prva godina", value: "1" },
  { label: "Druga godina - Računarsko inženjerstvo", value: "2" },
  { label: "Druga godina - Softversko inženjerstvo", value: "3" },
  { label: "Treća godina - Računarsko inženjerstvo", value: "4" },
  { label: "Treća godina - Softversko inženjerstvo", value: "5" },
  { label: "Četvrta godina - Računarsko inženjerstvo", value: "6" },
  { label: "Četvrta godina - Softversko inženjerstvo", value: "7" },
  { label: "Druga godina - Elektronika i telekomunikacije", value: "8" },
  { label: "Treća godina - Elektronika", value: "9" },
  { label: "Treća godina - Telekomunikacije", value: "10" },
  { label: "Četvrta godina - Elektronika", value: "11" },
  { label: "Četvrta godina - Telekomunikacije", value: "12" },
  { label: "Druga godina - Elektroenergetika i automatika", value: "13" },
  { label: "Treća godina - Automatika", value: "14" },
  { label: "Treća godina - Elektroenergetika", value: "15" },
  { label: "Četvrta godina - Automatika", value: "16" },
  { label: "Četvrta godina - Elektroenergetika", value: "17" },
];

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
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [isEditable, setIsEditable] = useState(false); // Dodato stanje za omogućavanje/onemogućavanje editovanja

  useEffect(() => {
    const handleResize = () => {
      setDimensions(Dimensions.get("window"));
    };

    Dimensions.addEventListener("change", handleResize);

    return () => {
      // Dimensions.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchScheduleData = async (scheduleId, selectedOption) => {
      try {
        const data = await HttpService.get(
          `schedule/${scheduleId}/items?option=${selectedOption}`
        );

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

    const scheduleId = 5; // Pretpostavljeni ID rasporeda
    fetchScheduleData(scheduleId, selectedOption);
  }, [selectedOption]);

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
      scheduleId: 5, // ID rasporeda vezan za korisnika
      option: selectedOption,
    };

    console.log("Saljemo na backend:", payload);

    try {
      await HttpService.create("scheduleItem", payload);
    } catch (error) {
      console.error("Error saving schedule data:", error);
    }
  };

  const handleCellPress = (timeIndex, dayIndex) => {
    if (isEditable) {
      setEditingCell({ timeIndex, dayIndex });
    }
  };

  const toggleEditMode = () => {
    setIsEditable((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Raspored</Text>

      <View style={styles.dropdownContainer}>
        <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={[styles.picker, !isEditable && styles.disabledPicker]}
          enabled={isEditable}
          dropdownIconColor={isEditable ? "#013868" : "#aaa"}
          mode="dropdown" // Ovo može pomoći
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
          </Picker>

        </View>

        <TouchableOpacity
          style={[
            styles.editButton,
            { backgroundColor: isEditable ? "#D9534F" : "#013868" },
          ]}
          onPress={toggleEditMode}
        >
          <Icon name="edit" size={24} color="#fff" />
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
                      editingCell.dayIndex === dayIndex &&
                      isEditable ? (
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013868",
    textAlign: "center",
    marginVertical: 15,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#ddd",
    overflow: "hidden",
    marginRight: 10,
  },
  picker: {
    height: 54,
    color: "#013868",
    fontSize: 10,
  },
  disabledPicker: {
    backgroundColor: "#e0e0e0",
    color: "#aaa",
    opacity: 0.7,
  },
  editButton: {
    width: 50,
    height: 50,
    backgroundColor: "#013868",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
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
  picker: {
    height: 54,
    width: "100%", // ili precizna širina
    color: "#013868",
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

// idemoooo

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import ModalForReportedMaterial from "../components/ModalForReportedMaterial";

const data = [
  {
    id: "1",
    icon: "folder",
    title: "Prijavljen materijal #1",
    text: "Razlog prijavljenog materijala #1",
    reportedBy: "Prijavio materijal #user1",
    date: "12:50",
  },
];

const ReportedMaterialsScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDelete = () => {
    console.log(`Materijal ${selectedItem.title} izbrisan`);
    setModalVisible(false);
  };
  const handleMorePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const handleSuspendAndDelete = () => {
    console.log(
      `Materijal ${selectedItem.title} izbrisan i korisnik suspendovan`
    );
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Icon name={item.icon} size={24} color="#013868" />
      </View>
      <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={() => handleMorePress(item)}>
          <Icon name="ellipsis-h" style={styles.moreIcon} />
        </TouchableOpacity>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemText}>{item.reportedBy}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Prijavljeni materijali</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
      <ModalForReportedMaterial
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onDelete={handleDelete}
        onSuspendAndDelete={handleSuspendAndDelete}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013868",
    textAlign: "center",
    marginVertical: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: "#013868",
    marginLeft: 10,
  },
  itemText: {
    fontSize: 12,
    color: "#013868",
    marginLeft: 10,
    marginTop: 10,
  },
  itemDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "right",
  },
  moreIcon: {
    color: "#013868",
    fontSize: 27,
    marginRight: 5,
    marginTop: 5,
    position: "absolute",
    right: 0,
  },
});

export default ReportedMaterialsScreen;

import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";

const SidebarComponent = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const translateX = useRef(new Animated.Value(-350)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -350,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  const onClose2 = () => {
    onClose();
    translateX.setValue(-350);
  };
  const handleChatPress = () => {
    onClose();
    navigation.navigate("ChatList");
  };

  const handleMaterijaliPress = () => {
    onClose();
    navigation.navigate("Materijali");
  };

  const handleProblemsPress = () => {
    onClose();
    navigation.navigate("Problems");
  };

  const handleRasporedPress = () => {
    onClose();
    navigation.navigate("Schedule");
  };

  const handleInstructionPress = () => {
    onClose();
    navigation.navigate("Instruction");
  };
  const handleOglasiPress = () => {
    onClose();
    navigation.navigate("Ads");
  };

  const handleOsnovneGrupe = () => {
    onClose();
    navigation.navigate("ElementaryGroupChat");
  };

  const handleLogoutPress = () => {
    onClose();
    navigation.navigate("Login");
  };

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.SidebarComponentOverlay}>
        <Animated.View
          style={[
            styles.SidebarComponentContainer,
            { transform: [{ translateX }] },
          ]}
        >
          <View style={styles.SidebarComponentProfileSection}>
            <TouchableOpacity
              onPress={onClose2}
              style={styles.SidebarComponentCloseButton}
            >
              <Icon name="bars" size={30} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.SidebarComponentProfilePicture}>
              <Icon name="user" size={80} color="#0b4b85" />
            </View>
            <View style={styles.SidebarComponentProfileDetails}>
              <Text style={styles.SidebarComponentName}>Milan Iliskovic</Text>
              <Text style={styles.SidebarComponentEmail}>
                milan.iliskovic@student.etf.unibl.org
              </Text>
            </View>
          </View>
          <View style={styles.SidebarComponentMenuSection}>
            <ScrollView style={styles.SidebarComponentMenu}>
              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleChatPress}
              >
                <Icon name="comments" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>
                  Aktivni razgovori
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleMaterijaliPress}
              >
                <Icon name="folder" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>Materijali</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleRasporedPress}
              >
                <Icon name="calendar" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>Raspored</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleOglasiPress}
              >
                <Icon name="bullhorn" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>Oglasi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleInstructionPress}
              >
                <Icon name="book" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>Instrukcije</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleOsnovneGrupe}
              >
                <Icon name="users" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>
                  Osnovne grupe
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.SidebarComponentMenuItem}
                onPress={handleProblemsPress}
              >
                <FeatherIcon name="alert-triangle" size={25} color="#013868" />
                <Text style={styles.SidebarComponentMenuText}>
                  Prijavljeni problemi
                </Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.SidebarComponentMenuItem,
                styles.SidebarComponentLogout,
              ]}
              onPress={handleLogoutPress}
            >
              <Icon name="sign-out" size={25} color="#ff4b5c" />
              <Text
                style={[styles.SidebarComponentMenuText, { color: "#ff4b5c" }]}
              >
                Odjavi se
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  SidebarComponentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  SidebarComponentContainer: {
    width: 330,
    height: "100%",
    backgroundColor: "#fff",
    padding: 0,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  SidebarComponentCloseButton: {
    paddingTop: 30,
    alignItems: "flex-end",
    marginBottom: 20,
    backgroundColor: "#013868",
    width: "100%",
    paddingRight: 20,
  },
  SidebarComponentProfileSection: {
    backgroundColor: "#013868",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },
  SidebarComponentProfilePicture: {
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#ffffff",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  SidebarComponentProfileDetails: {
    padding: 20,
    alignItems: "center",
  },
  SidebarComponentName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  SidebarComponentEmail: {
    color: "#dddddd",
  },
  SidebarComponentMenuSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  SidebarComponentMenu: {
    flex: 1,
  },
  SidebarComponentMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#C7C7C7",
  },
  SidebarComponentMenuText: {
    color: "#007BFF",
    fontSize: 18,
    marginLeft: 15,
  },
  SidebarComponentLogout: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#007BFF",
    paddingTop: 10,
    borderBottomWidth: 0,
  },
});

export default SidebarComponent;

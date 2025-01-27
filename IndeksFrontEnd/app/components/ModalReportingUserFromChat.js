import React, { useState } from "react";
import HttpService from "../services/HttpService";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

const ModalReportingUserFromChat = ({
  visible,
  onClose,
  onConfirm,
  userName,
  userId,
  chatId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReportUser = async () => {
    console.log("uspjesno prijavljeno");
    Alert.alert("Uspješno", "Vaša prijava je poslata.");
    // logika ili bez logike za prijavljivanje, mozda samo treba pisati uspjesno prijavljeno, za razliku od blokiranja gdje potrebno staviti na blok listu
    //setIsLoading(true);
    // try {
    //   console.log(userId);
    //   // logika ili bez logike za prijavljivanje, mozda samo treba pisati uspjesno prijavljeno, za razliku od blokiranja gdje potrebno staviti na blok listu
    //   //   const response = await HttpService.create(
    //   //     `blocked-accounts/block/chat/${userId}/${chatId}`
    //   //   );
    //   //   console.log(response);
    //   //   console.log(`Korisnik ${chatId} uspešno blokiran:`, response.data);
    //   //onConfirm();
    // } catch (error) {
    //   console.error("Greška prilikom prijavljivanja korisnika:", error);
    //   Alert.alert(
    //     "Greška",
    //     "Došlo je do greške prilikom prijavljivanja korisnika."
    //   );
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Prijavljivanje korisnika</Text>
          <Text style={styles.message}>
            Da li ste sigurni da želite prijaviti korisnika{" "}
            <Text style={styles.userName}>{userName}</Text>?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Otkaži</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleReportUser}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.confirmButtonText}>Prijavi</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  userName: {
    fontWeight: "bold",
    color: "#d32f2f",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#d32f2f",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ModalReportingUserFromChat;

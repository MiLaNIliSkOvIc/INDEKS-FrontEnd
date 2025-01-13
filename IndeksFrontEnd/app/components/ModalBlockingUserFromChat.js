import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ModalBlockingUserFromChat = ({
  visible,
  onClose,
  onConfirm,
  userName,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Blokiranje korisnika</Text>
          <Text style={styles.message}>
            Da li ste sigurni da želite blokirati korisnika{" "}
            <Text style={styles.userName}>{userName}</Text>?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Otkaži</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                console.log(`Blokiran korisnik: ${userName}`);
                onConfirm();
              }}
            >
              <Text style={styles.confirmButtonText}>Blokiraj</Text>
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

export default ModalBlockingUserFromChat;

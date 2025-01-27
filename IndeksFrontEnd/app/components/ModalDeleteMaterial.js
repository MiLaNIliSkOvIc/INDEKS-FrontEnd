import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ModalDeleteMaterial = ({
  visible,
  onClose,
  onSubmit,
  selectedMaterial,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Brisanje materijala</Text>
          <Text style={styles.modalDescription}>{selectedMaterial?.name}</Text>
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButton} onPress={onSubmit}>
              <Text style={styles.modalButtonText}>Obriši</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Otkaži</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalDescription: { fontSize: 16, color: "#013868", marginBottom: 10 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height: 80,
    textAlignVertical: "top",
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    backgroundColor: "#013868",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: { backgroundColor: "#999" },
});

export default ModalDeleteMaterial;

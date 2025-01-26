import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ModalReportMaterial = ({
  visible,
  onClose,
  onSubmit,
  selectedMaterial,
  reportDescription,
  setReportDescription,
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
          <Text style={styles.modalTitle}>Prijava materijala</Text>
          <Text style={styles.modalDescription}>{selectedMaterial?.name}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Opis prijave"
            value={reportDescription}
            onChangeText={setReportDescription}
            multiline
          />
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButton} onPress={onSubmit}>
              <Text style={styles.modalButtonText}>Prijavi</Text>
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

export default ModalReportMaterial;

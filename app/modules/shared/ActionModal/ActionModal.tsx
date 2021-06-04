import React, { useState } from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import { color, fontWeight } from "../../../styles/theme";

type MyProps = {
  message: string,
  visible: boolean,
  onCancel: () => void,
  onAccept: () => void,
}
const ActionModal: React.FunctionComponent<MyProps> = ({ message, visible, onCancel, onAccept }) => {

    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={onCancel} >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>{message}</Text>
                  <View style={styles.buttonView}>
                    <Pressable
                        style={[styles.button, styles.cancelButton]}
                        onPress={onCancel} >
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.acceptButton]}
                        onPress={onAccept} >
                        <Text style={styles.textStyle}>Aceptar</Text>
                    </Pressable>
                  </View>
              </View>
          </View>
      </Modal>
    );
    
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 30,
    backgroundColor: color.white.whitesmoke,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: color.black.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: color.primary.dark,
  },
  acceptButton: {
    backgroundColor: color.red.red,
  },
  textStyle: {
    color: color.white.white,
    fontWeight: fontWeight.L,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

  export default ActionModal;
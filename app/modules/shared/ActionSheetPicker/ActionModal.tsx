import React, { useState } from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import { color, fontWeight } from "../../../styles/theme";

type MyProps = {
    message: string,
    visible: boolean,
    onClose: () => void,
}
const PickerModal: React.FunctionComponent<MyProps> = ({ message, visible, onClose }) => {

    // const [modalVisible, setModalVisible] = useState(visible);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable
                        style={styles.button}
                        onPress={onClose} >
                        <Text style={styles.textStyle}>Aceptar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
    
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: color.blue.steelBlue,
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

  export default PickerModal;
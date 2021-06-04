import React, { useState } from "react";
import { Modal, Pressable, View, Text, StyleSheet, TextInput } from "react-native";
import { color, fontSize, fontWeight } from "../../../styles/theme";

type MyProps = {
  title: string,
  textArea: string,
  visible: boolean,
  onCancel: () => void,
  onAccept: (textArea) => void,
  editable: boolean,
}
const TextModal: React.FunctionComponent<MyProps> = ({ title, textArea, visible, onCancel, onAccept, editable }) => {
    const textAreaAux = textArea;
    const [textAreaState, setTextAreaState] = useState(textAreaAux);

    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={onCancel} >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.titleText}>{title}</Text>
                  <View style={{ marginVertical: 20, padding: 5 }}>
                    {
                      editable 
                      ? <TextInput
                          style={{ maxHeight: 100, maxWidth: '100%' }}
                          multiline={true}
                          // scrollEnabled
                          numberOfLines={4}
                          maxLength={200}
                          // editable={false}
                          placeholder='Escribe aqui como fue tu experiencia con el transportista (Máximo 200 caracteres)'
                          onChangeText={(text) => setTextAreaState(text)}
                          defaultValue={textArea}/>
                      :
                        <Text>
                          {textArea}
                        </Text>
                    }
                  </View>
                  <View style={styles.buttonView}>
                    {
                      editable && 
                      <Pressable
                          style={[styles.button, styles.cancelButton]}
                          onPress={onCancel} >
                          <Text style={[styles.textStyle, { color: color.black.black }]}>Cancelar</Text>
                      </Pressable>
                    }
                    <Pressable
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => onAccept(textAreaState)} >
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
    // justifyContent: "center",
    marginTop: 30,
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
    borderColor: color.primary.dark,
    borderWidth: 1,
  },
  acceptButton: {
    backgroundColor: color.primary.dark,
  },
  textStyle: {
    color: color.white.white,
    fontWeight: fontWeight.L,
    textAlign: "center"
  },
  titleText: {
    fontSize: fontSize.M,
    fontWeight: fontWeight.M,
    textAlign: "center"
  }
});

  export default TextModal;
import React, { useState } from "react";
import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { color, fontWeight } from "../../../styles/theme";

type MyProps = {
    hours: number,
    minutes: number,
    visible: boolean,
    titleModal: string,
    onConfirm: (hours, minutes) => void,
}
const PickerModal: React.FunctionComponent<MyProps> = ({ hours, minutes, titleModal, visible, onConfirm }) => {

    const [possibleHours, setPossibleHours] = useState([...Array(30)].map((_, index) => index));
    const [possibleMinutes, setPossibleMinutes] = useState([0,5,10,15,20,25,30,35,40,45,50,55]);
    const [hoursState, setHoursState] = useState(hours);
    const [minutesState, setMinutesState] = useState(minutes);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{titleModal}</Text>
                    <View style={styles.pickerView}>
                        <Picker
                            style={{ width: '20%' }}
                            selectedValue={hoursState}
                            onValueChange={(hour) => setHoursState(hour)}>
                            {
                                possibleHours.map((item, index) => {
                                    return <Picker.Item label={item.toString()} value={item} key={index} />
                                })
                            }
                        </Picker>
                        <Text> horas y </Text>
                        <Picker
                            style={{ width: '25%' }}
                            selectedValue={minutesState}
                            onValueChange={(minute) => setMinutesState(minute)}>
                            {
                                possibleMinutes.map((item, index) => {
                                    return <Picker.Item label={item.toString()} value={item} key={index} />
                                })
                            }
                        </Picker>
                        <Text> mins. </Text>
                    </View>
                    <Pressable
                        style={styles.button}
                        onPress={() => onConfirm(hoursState, minutesState)} >
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
      marginHorizontal: 10,
      marginVertical: 30,
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
    pickerView: {
      flexDirection: 'row',
      alignItems: 'center',
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
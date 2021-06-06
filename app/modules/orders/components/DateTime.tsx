import React, { Component } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { H1, Button, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Localization from 'expo-localization';
import moment from "moment";
import "moment-timezone";
import 'moment/min/locales';
import { displayDate, currentDate, dateToMoment, currentDateMoment } from '../utils/utils';
import { color, iconSize } from '../../../styles/theme';

type MyProps = {
    dateOrder: string,
    onSetDateOrder: (date) => void,
}
type MyState = {
    date: Date,
    visible: boolean,
    now: boolean,
}
export default class DateTime extends Component<MyProps, MyState> {
    
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            visible: false,
            now: true,
        };
    }

    componentDidMount() {
        moment.locale(Localization.locale.substring(0,2));
        const { dateOrder } = this.props;
        let date;
        if (dateOrder != '') {
            date = new Date(moment(dateOrder).tz(Localization.timezone).format());
        } else {
            date = currentDate();
        }
        this.setState({ date });
    }

    showDatePicker = () => {
        this.setState({ visible: true });
    };
    
    hideDatePicker = () => {
        this.setState({ visible: false });
    };
    
    handleConfirm = (date, isNow) => {
        this.setState({ date });
        const { onSetDateOrder } = this.props;
        // onSetDateOrder(dateToMoment(date));
        onSetDateOrder(isNow ? '' : dateToMoment(date));
        this.hideDatePicker();
        this.setState({ now: isNow })
    };

    render() {
        const { visible, date, now } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={[styles.button, now ? styles.buttonNotSelected : styles.buttonSelected]}
                        onPress={this.showDatePicker} >
                        <MaterialIcons name="access-time" size={iconSize.L} color={now ? color.black.black : color.white.white} />
                        <Text style={{ marginLeft: 5 }}>Programar una día</Text>
                    </Pressable>
                    <Pressable 
                        style={[styles.button, now ? styles.buttonSelected : styles.buttonNotSelected]}
                        onPress={() => this.handleConfirm(currentDate(), true)} >
                        <Text>Ahora</Text>
                    </Pressable>
                </View>
                <View style={styles.titleContainer}>
                    <Text>{now ? 'El pedido es para ahora:' : 'El pedido va a ser programado para el:'}</Text>
                    <H1 style={{ padding: 20, textAlign: 'center' }}>{displayDate(date)}</H1>
                </View>
                <DateTimePickerModal
                    date={new Date(date)}
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                    headerTextIOS='Programar el pedido'
                    minimumDate={new Date()}
                    // maximumDate={currentDateMoment().add(20, 'years').toDate()}
                    minuteInterval={5}
                    // timeZoneOffsetInMinutes={-180}
                    locale={Localization.locale.substring(0,2)}
                    is24Hour={true}
                    isVisible={visible}
                    mode='datetime'
                    onCancel={this.hideDatePicker}
                    onConfirm={(date) => this.handleConfirm(date, false)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        margin: 20
    },
    button: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        borderRadius: 10,
    },
    buttonSelected: {
        backgroundColor: color.primary.middle
    },
    buttonNotSelected: {
        borderWidth: 1, 
        borderColor: color.primary.middle
    },
    titleContainer: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center'
    }
  });
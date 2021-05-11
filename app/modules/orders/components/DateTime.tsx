import React, { Component } from 'react';
import { View } from 'react-native';
import { H1, Button, Text, Icon } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Localization from 'expo-localization';
import moment from "moment";
import "moment-timezone";
import 'moment/min/locales';
import { displayDate, currentDate, dateToMoment, currentDateMoment } from '../utils/utils';

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
        const date = new Date(moment(dateOrder).tz(Localization.timezone).format());
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
        // const dateNumber = moment(date).format("YYYYMMDDHHmm");
        // const dateFormat = moment(date).format()
        onSetDateOrder(dateToMoment(date));
        this.hideDatePicker();
        this.setState({ now: isNow })
    };

    render() {
        const { visible, date, now } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
                    <Button 
                        iconLeft 
                        info={now}
                        primary={!now}
                        onPress={this.showDatePicker} >
                        <Icon name='time-outline' />
                        <Text>Programar una día</Text>
                    </Button>
                    <Button 
                        info={!now}
                        primary={now}
                        onPress={() => this.handleConfirm(currentDate(), true)} >
                        <Text>Ahora</Text>
                    </Button>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
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
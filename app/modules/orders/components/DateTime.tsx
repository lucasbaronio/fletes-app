import React, { Component } from 'react';
import { View } from 'react-native';
import { H1, Button, Text, Icon, H3 } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import 'moment/min/locales';

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
        moment.locale('es');
        const { dateOrder } = this.props;
        const date = new Date(moment(dateOrder, "YYYYMMDDHHmm").format());
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
        const dateNumber = moment(date).format("YYYYMMDDHHmm");
        onSetDateOrder(dateNumber);
        this.hideDatePicker();
        this.setState({ now: isNow })
    };

    displayDate = () => {
        const { date } = this.state;
        const dateMoment = moment(date);
        const now = moment(new Date());
        const diff = now.diff(dateMoment, 'days');
        if (diff > 6 || diff < -6) {
            return moment(date).format('LLLL');
        } else {
            return moment(date).calendar();
        }
    }

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
                        onPress={() => this.handleConfirm(new Date(), true)} >
                        <Text>Ahora</Text>
                    </Button>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Text>{now ? 'El pedido es para ahora:' : 'El pedido va a ser programado para el:'}</Text>
                    <H1 style={{ padding: 20, textAlign: 'center' }}>{this.displayDate()}</H1>
                </View>
                <DateTimePickerModal
                    date={date}
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                    headerTextIOS='Programar el pedido'
                    minimumDate={new Date()}
                    minuteInterval={5}
                    timeZoneOffsetInMinutes={-180}
                    locale="en_GB"
                    is24Hour={true}
                    isVisible={visible}
                    mode='datetime'
                    onCancel={this.hideDatePicker}
                    onConfirm={(date) => this.handleConfirm(date, false)} />
            </View>
        );
    }
}
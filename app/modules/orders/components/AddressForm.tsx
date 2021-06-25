import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, Label,  } from 'native-base';
import { KeyboardAvoidingView, Platform, View } from 'react-native';


type MyProps = {
    onSetStreetName: (streetName) => void,
    onSetStreetNumber: (streetNumber) => void,
    onSetDoorNumber: (doorNumber) => void,
    streetName: string,
    streetNumber: string,
    doorNumber: string,
}
type MyState = {
    error: string,
    isLoading: boolean,
    streetName: string,
    streetNumber: string,
    doorNumber: string,
}
export default class AddressForm extends Component<MyProps, MyState> {
    secondTextInputRef: any;
    thirdTextInputRef: any;

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoading: true,
            // @ts-ignore
            streetName: '',
            streetNumber: '',
            doorNumber: '',
        };
    }

    componentDidMount() {
        const { streetName, streetNumber, doorNumber } = this.props;
        this.setState({
            streetName, 
            streetNumber, 
            doorNumber
        });
    }

    render() {
        const { streetName, streetNumber, doorNumber } = this.state;
        const { onSetStreetName, onSetStreetNumber, onSetDoorNumber } = this.props;

        return (
            <View style={{ flex: 1, marginBottom: 5, marginHorizontal: 10 }}>
                <Item floatingLabel>
                    <Label>Calle (*)</Label>
                    <Input
                        onChangeText={streetName => {
                            this.setState({streetName});
                        }}
                        onEndEditing={() => onSetStreetName(streetName)}
                        returnKeyType='next'
                        // @ts-ignore
                        onSubmitEditing={() => { this.secondTextInputRef._root.focus(); }}
                        // onSubmitEditing={() => { secondTextInputRef.current._root.focus(); }}
                        blurOnSubmit={false}
                        value={streetName}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Numero (*)</Label>
                    <Input 
                        getRef={(input) => { this.secondTextInputRef = input; }}
                        // getRef={(input) => { secondTextInputRef.current = input; }}
                        onChangeText={streetNumber => {
                            this.setState({streetNumber});
                        }}
                        onEndEditing={() => onSetStreetNumber(streetNumber)}
                        returnKeyType='next'
                        // @ts-ignore
                        onSubmitEditing={() => { this.thirdTextInputRef._root.focus(); }}
                        // onSubmitEditing={() => { thirdTextInputRef.current._root.focus(); }}
                        blurOnSubmit={false}
                        maxLength={6}
                        value={streetNumber}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Apto.</Label>
                    <Input 
                        getRef={(input) => { this.thirdTextInputRef = input; }}
                        // getRef={(input) => { thirdTextInputRef.current = input; }}
                        onChangeText={doorNumber => {
                            this.setState({doorNumber});
                        }}
                        onEndEditing={() => onSetDoorNumber(doorNumber)}
                        returnKeyType='done'
                        maxLength={6}
                        // onSubmitEditing={() => onNextScreen({streetName, streetNumber, doorNumber})}
                        value={doorNumber}/>
                </Item>
            </View>
        );
    }
}
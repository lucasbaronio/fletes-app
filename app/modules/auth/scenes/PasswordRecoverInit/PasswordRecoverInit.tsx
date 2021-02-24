import React from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index"
const { passwordRecoverInit } = auth;
import { isNotEmpty, validateMobileNumber } from '../../utils/validate';
import { 
    ERROR_EMPTY_MOBILE_NUMBER, 
    ERROR_INCORRECT_MOBILE_NUMBER 
} from '../../../../config/strings';

type MyProps = {
    passwordRecoverInit: (data, onSuccess, onError) => void,
    navigation: any,
    isLoading: boolean,
}
type MyState = {
    error: string,
    mobileNumber: string,
}

class PasswordRecoverInit extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            mobileNumber: '',
        }
    }

    goToLogIn = () => {
        const { navigation } = this.props;

        Toast.hide();
        navigation.navigate('Login');
    }

    onSubmit = () => {
        Toast.hide();
        this.setState({ error: '' });

        const { mobileNumber } = this.state;
        const val1 = isNotEmpty(mobileNumber, () => {
            this.showToast(ERROR_EMPTY_MOBILE_NUMBER)
        });
        const val2 = val1 && validateMobileNumber(mobileNumber, () => {
            this.showToast(ERROR_INCORRECT_MOBILE_NUMBER)
        });

        if (val1 && val2) {
            const { passwordRecoverInit } = this.props;
            passwordRecoverInit({ mobileNumber }, this.onSuccess, this.onError);
        }
    }

    showToast = (msj: string) => {
        Toast.show({
            text: msj,
            buttonText: "Aceptar",
            buttonTextStyle: { color: "#008000" },
            buttonStyle: { backgroundColor: "#5cb85c" },
            duration: 300000
        })
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('PasswordRecover');
    }

    onError = (error) => {
        this.setState({ error });
        this.showToast(this.state.error);
    }

    render() {
        const { isLoading } = this.props;
        return (
            <Container>
                <Content
                    padder={false}
                    scrollEnabled={false}>
                    
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Image style={{ height: 200, width: 200 }} resizeMode='cover' source={require('../../../../../assets/driver.png')}/>
                    </View>

                    <Form style={{ padding: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>🇺🇾 (+598)</Text>
                            <Input 
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular"
                                onChangeText={mobileNumber => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", marginVertical: 10, paddingVertical: 10 }}>
                            <Button 
                                disable={isLoading}
                                style={{ flex: 1, flexDirection: 'row', justifyContent: "center", paddingVertical: 20 }}
                                onPress={this.onSubmit}>
                                {
                                    isLoading ?
                                    <ActivityIndicator />
                                    :
                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                        Recuperar cuenta
                                    </Text>
                                }
                            </Button>
                        </View>
                    </Form>

                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.authReducer.isLoading
    }
}

export default connect(mapStateToProps, { passwordRecoverInit })(PasswordRecoverInit);

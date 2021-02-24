import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index";
const { login } = auth;

import { isNotEmpty, validateMobileNumber } from '../../utils/validate';
import { 
    ERROR_EMPTY_MOBILE_NUMBER, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_MOBILE_NUMBER 
} from '../../../../config/strings';

// const error = {
//     general: "",
//     email: "",
//     password: ""
// }

type MyProps = {
    login: (data, onSuccess, onError) => void,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    // error: {
    //     general: string,
    //     email: string,
    //     password: string
    // }
    error: string,
    mobileNumber: string,
    password: string,
}

class Login extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            mobileNumber: '',
            password: '',
        }
    }

    onForgotPassword = () => {
        const { navigation } = this.props;

        Toast.hide();
        navigation.navigate('PasswordRecoverInit');
    }

    goToRegister = () => {
        const { navigation } = this.props;

        Toast.hide();
        navigation.navigate('RegisterInit');
    }

    onSubmit = () => {
        Toast.hide();
        this.setState({ error: '' });

        const { mobileNumber, password } = this.state;
        const val1 = isNotEmpty(mobileNumber, () => {
            this.showToast(ERROR_EMPTY_MOBILE_NUMBER)
        });
        const val2 = val1 && isNotEmpty(password, () => {
            this.showToast(ERROR_EMPTY_PASSWORD)
        });
        const val3 = val1 && val2 && validateMobileNumber(mobileNumber, () => {
            this.showToast(ERROR_INCORRECT_MOBILE_NUMBER)
        });

        if (val1 && val2 && val3) {
            const { login } = this.props;
            login({ mobileNumber, password }, this.onSuccess, this.onError);
        }
    }

    showToast = (msj) => {
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
        navigation.navigate('RouterLogged');
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
                    scrollEnabled={false}
                    // contentContainerStyle={{
                    //     flex: 1,
                    //     flexDirection: 'column',
                    //     justifyContent: 'center'
                    // }}
                >
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Image style={{ height: 200, width: 200 }} resizeMode='cover' source={require('../../../../../assets/driver.png')}/>
                    </View>

                    <Form style={{ paddingHorizontal: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>🇺🇾(+598)</Text>
                            <Input 
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular (Ej: 91234567)"
                                onChangeText={mobileNumber => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                textContentType="password" 
                                secureTextEntry={true} 
                                placeholder="Contraseña"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end" }}>
                            <Text onPress={this.onForgotPassword}>Has olvidado la contraseña?</Text>
                        </View>
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
                                        Iniciar Sesión
                                    </Text>
                                }
                            </Button>
                        </View>
                    </Form>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                        <Text>No tienes una cuenta? </Text>
                        <Text 
                            style={{ color: 'blue' }} 
                            onPress={this.goToRegister}>
                                Crear cuenta
                        </Text>
                    </View>
                    
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

export default connect(mapStateToProps, { login })(Login);

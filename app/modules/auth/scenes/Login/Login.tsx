import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index";
const { login } = auth;

import { showToast } from '../../../../components/Toast';
import { isNotEmpty, validateMobileNumber } from '../../utils/validate';
import { 
    ERROR_EMPTY_MOBILE_NUMBER, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_MOBILE_NUMBER 
} from '../../../../config/strings';

type MyProps = {
    login: (data, onSuccess, onError) => void,
    pushNotificationID: string,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    mobileNumber: string,
    password: string,
    showPassword: boolean,
}

class Login extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            // mobileNumber: '',
            password: '',
            mobileNumber: '091000000',
            // password: 'strongPassword',
            showPassword: false,
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
            showToast(ERROR_EMPTY_MOBILE_NUMBER)
        });
        const val2 = val1 && isNotEmpty(password, () => {
            showToast(ERROR_EMPTY_PASSWORD)
        });
        const val3 = val1 && val2 && validateMobileNumber(mobileNumber, () => {
            showToast(ERROR_INCORRECT_MOBILE_NUMBER)
        });

        if (val1 && val2 && val3) {
            const { login, pushNotificationID } = this.props;
            login({ mobileNumber, password, pushNotificationID }, this.onSuccess, this.onError);
        }
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('RouterLogged');
    }

    onError = (error) => {
        this.setState({ error });
        showToast(this.state.error);
    }

    render() {
        const { isLoading } = this.props;
        const { showPassword, mobileNumber, password } = this.state;
        return (
            <Container>
                <Content 
                    padder={false}
                    scrollEnabled={false}
                >
                    <View style={{ alignItems: 'center', margin: 40 }}>
                        <Image style={{ height: 180, width: 350 }} resizeMode='cover' source={require('../../../../../assets/fletes_icon.png')}/>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>FletesApp</Text>
                    </View>

                    <Form style={{ paddingHorizontal: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>🇺🇾(+598)</Text>
                            <Input 
                                maxLength={9}
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular"
                                onChangeText={mobileNumber => this.setState({ mobileNumber })}
                                value={mobileNumber}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                textContentType="password" 
                                secureTextEntry={!showPassword} 
                                autoCapitalize="none"
                                placeholder="Contraseña"
                                onChangeText={password => this.setState({ password })}
                                value={password}/>
                            <Button transparent onPress={() => this.setState({ showPassword: !showPassword})}>
                                <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} />
                            </Button>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end" }}>
                            <Text onPress={this.onForgotPassword}>Has olvidado la contraseña?</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", marginVertical: 10, paddingVertical: 10 }}>
                            <Button 
                                // @ts-ignore
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
        isLoading: state.authReducer.isLoading,
        pushNotificationID: state.authReducer.pushNotificationID,
    }
}

export default connect(mapStateToProps, { login })(Login);

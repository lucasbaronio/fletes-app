import React from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner, Header, Left, Right, Body } from 'native-base';

import { actions as auth } from "../../index"
const { register } = auth;

import styles from './styles';
import { confirmPassword, isNotEmpty, isOnlyNumbers } from '../../utils/validate';
import { validatePassword } from '../../utils/validate';
import { 
    ERROR_EMPTY_CODE, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_CODE, 
    ERROR_PASSWORD_DIFF, 
    ERROR_PASSWORD_LENGTH 
} from '../../../../config/strings';
import CustomModal from '../../../../components/CustomModal';

type MyProps = {
    register: (data, onSuccess, onError) => void,
    codeId: string,
    pushNotificationID: string,
    navigation: any,
    isLoading: boolean,
}
type MyState = {
    error: string,
    visibleModal: boolean,
    code: string,
    password: string,
    showPassword: boolean,
}

class Register extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
            code: '',
            password: '',
            showPassword: false,
        }
    }

    onSubmit = () => {
        this.setState({ error: '', visibleModal: false });
        
        const { code, password} = this.state;
        const val1 = isNotEmpty(code, () => {
            this.setState({ error: ERROR_EMPTY_CODE, visibleModal: true });
        });
        const val2 = val1 && isNotEmpty(password, () => {
            this.setState({ error: ERROR_EMPTY_PASSWORD, visibleModal: true });
        });
        const val3 = val1 && val2 && isOnlyNumbers(code, () => {
            this.setState({ error: ERROR_INCORRECT_CODE, visibleModal: true });
        });
        const val4 = val1 && val2 && val3 && validatePassword(password, () => {
            this.setState({ error: ERROR_PASSWORD_LENGTH, visibleModal: true });
        });

        if (val1 && val2 && val3 && val4) {
            const { register, codeId, pushNotificationID } = this.props;
            console.log('pushNotificationID', pushNotificationID);
            register({ codeId, code, password, pushNotificationID }, this.onSuccess, this.onError);
        }
    }

    onSuccess = () => {
        const { navigation } = this.props;
        navigation.navigate('RouterLogged');
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onCloseModal = () => {
        this.setState({ visibleModal: false, error: '' });
    }

    render() {
        const { isLoading } = this.props;
        const { showPassword, code, password, error, visibleModal } = this.state;
        return (
            <Container>
                {/* <Header /> */}
                <Content
                    padder={false}
                    // scrollEnabled={false}
                    contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
                >
                    <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                    <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                        <Text style={{ textAlign: 'center' }}>
                            Te hemos enviado un código por SMS a su celular
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            Para completar el proceso de verificación de su numero de telefono, por favor, ingresa el código de activación de 6 digitos y una contraseña
                        </Text>
                    </View>

                    <Form style={{ padding: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='keypad-outline' />
                            <Input 
                                maxLength={6}
                                keyboardType="number-pad" 
                                placeholder="Ingrese el código que le llego al celular"
                                onChangeText={code => this.setState({ code })}
                                value={code}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                keyboardType="default" 
                                secureTextEntry={!showPassword} 
                                autoCapitalize="none"
                                placeholder="Ingrese una contraseña"
                                onChangeText={password => this.setState({ password })}
                                value={password}/>
                            <Button transparent onPress={() => this.setState({ showPassword: !showPassword})}>
                                <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} />
                            </Button>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        {/* <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                keyboardType="default" 
                                secureTextEntry={true} 
                                autoCapitalize="none"
                                placeholder="Repite la contraseña nueva"
                                onChangeText={repassword => this.setState({ repassword })}
                                value={this.state.repassword}/>
                            {false && <Icon name='close-circle' />}
                        </Item> */}
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
                                        Crear cuenta
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
        isLoading: state.authReducer.isLoading,
        codeId: state.authReducer.codeId,
        pushNotificationID: state.authReducer.pushNotificationID,
    }
}

export default connect(mapStateToProps, { register })(Register);

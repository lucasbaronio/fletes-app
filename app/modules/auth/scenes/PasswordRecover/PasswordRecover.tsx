import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text } from 'native-base';

import { actions as auth } from "../../index"
const { passwordRecover } = auth;

import { showToast } from '../../../../components/Toast';
import { isNotEmpty, isOnlyNumbers, validatePassword } from '../../utils/validate';
import { 
    ERROR_EMPTY_CODE, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_CODE, 
    ERROR_PASSWORD_LENGTH 
} from '../../../../config/strings';

type MyProps = {
    passwordRecover: (data, onSuccess, onError) => void,
    codeId: string,
    navigation: any,
    isLoading: boolean,
}
type MyState = {
    error: string,
    code: string,
    password: string,
    showPassword: boolean,
}

class PasswordRecover extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            code: '',
            password: '',
            showPassword: false,
        }
    }

    onSubmit = () => {
        Toast.hide();
        this.setState({ error: '' });
        
        const { code, password} = this.state;
        const val1 = isNotEmpty(code, () => {
            showToast(ERROR_EMPTY_CODE)
        });
        const val2 = val1 && isNotEmpty(password, () => {
            showToast(ERROR_EMPTY_PASSWORD)
        });
        const val3 = val1 && val2 && isOnlyNumbers(code, () => {
            showToast(ERROR_INCORRECT_CODE)
        });
        const val4 = val1 && val2 && val3 && validatePassword(password, () => {
            showToast(ERROR_PASSWORD_LENGTH)
        });

        if (val1 && val2 && val3 && val4) {
            const { passwordRecover, codeId } = this.props;
            passwordRecover({ codeId, code, password }, this.onSuccess, this.onError);
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
        const { showPassword, password, code } = this.state;
        return (
            <Container>
                <Content
                    padder={false}
                    // scrollEnabled={false}
                    contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
                >

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
                                placeholder="Ingrese el código"
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
                                placeholder="Ingrese contraseña nueva"
                                onChangeText={password => this.setState({ password })}
                                value={password}/>
                            <Button transparent onPress={() => this.setState({ showPassword: !showPassword})}>
                                <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} />
                            </Button>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", marginVertical: 10 }}>
                            <Button 
                                disable={isLoading}
                                style={{ flex: 1, flexDirection: 'row', justifyContent: "center", paddingVertical: 20 }}
                                onPress={this.onSubmit}>
                                {
                                    isLoading ?
                                    <ActivityIndicator />
                                    :
                                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                        Recuperar Contraseña
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
    }
}

export default connect(mapStateToProps, { passwordRecover })(PasswordRecover);

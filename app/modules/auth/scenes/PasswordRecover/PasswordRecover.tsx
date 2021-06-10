import React from 'react';
import { View, Image, ActivityIndicator, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text } from 'native-base';

import { actions as auth } from "../../index"
const { passwordRecover } = auth;

import { isNotEmpty, isOnlyNumbers, validatePassword } from '../../utils/validate';
import { 
    ERROR_EMPTY_CODE, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_CODE, 
    ERROR_PASSWORD_LENGTH 
} from '../../../../config/strings';
import CustomModal from '../../../../components/CustomModal';
import styles from './styles';

type MyProps = {
    passwordRecover: (data, onSuccess, onError) => void,
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

class PasswordRecover extends React.Component<MyProps, MyState> {
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
            const { passwordRecover, codeId, pushNotificationID } = this.props;
            passwordRecover({ codeId, code, password, pushNotificationID }, this.onSuccess, this.onError);
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
        const { showPassword, password, code, error, visibleModal } = this.state;
        return (
            <Container>
                <Content
                    padder={false}
                    scrollEnabled={false}
                    contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
                >
                    <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                    <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                        {/* <Text style={{ textAlign: 'center' }}>
                            Te hemos enviado un código por SMS a su celular
                        </Text>
                        <Text style={{ textAlign: 'center' }}>
                            Para completar el proceso de verificación de su numero de telefono, por favor, ingresa el código de activación de 6 digitos y una contraseña
                        </Text> */}
                        <Text style={{ textAlign: 'center' }}>
                            Para poder recuperar su contraseña ingrese el código (000000) y a continuación su contraseña nueva.
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
                        <View style={[styles.rowContainer, { marginVertical: 10, paddingVertical: 10 }]}>
                            <Pressable 
                                disabled={isLoading}
                                style={[styles.rowContainer, styles.button]}
                                onPress={this.onSubmit}>
                                {
                                    isLoading ?
                                    <ActivityIndicator />
                                    :
                                    <Text style={styles.textButton}>
                                        Recuperar Contraseña
                                    </Text>
                                }
                            </Pressable>
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

export default connect(mapStateToProps, { passwordRecover })(PasswordRecover);

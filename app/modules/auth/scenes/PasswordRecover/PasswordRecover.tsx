import React from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index"
const { passwordRecover } = auth;

import { confirmPassword, isNotEmpty, isOnlyNumbers, validatePassword } from '../../utils/validate';
import { 
    ERROR_EMPTY_CODE, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_CODE, 
    ERROR_PASSWORD_DIFF, 
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
    repassword: string,
}

class PasswordRecover extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            code: '',
            password: '',
            repassword: '',
        }
    }

    onSubmit = () => {
        Toast.hide();
        this.setState({ error: '' });
        
        const { code, password, repassword } = this.state;
        const val1 = isNotEmpty(code, () => {
            this.showToast(ERROR_EMPTY_CODE)
        });
        const val2 = val1 && isNotEmpty(password, () => {
            this.showToast(ERROR_EMPTY_PASSWORD)
        });
        const val3 = val1 && val2 && isNotEmpty(repassword, () => {
            this.showToast(ERROR_EMPTY_PASSWORD)
        });
        const val4 = val1 && val2 && val3 && isOnlyNumbers(code, () => {
            this.showToast(ERROR_INCORRECT_CODE)
        });
        const val5 = val1 && val2 && val3 && val4 && confirmPassword(repassword, password, () => {
            this.showToast(ERROR_PASSWORD_DIFF)
        });
        const val6 = val1 && val2 && val3 && val4 && val5 && validatePassword(password, () => {
            this.showToast(ERROR_PASSWORD_LENGTH)
        });

        if (val1 && val2 && val3 && val4 && val5 && val6) {
            const { passwordRecover, codeId } = this.props;
            passwordRecover({ codeId, code, password }, this.onSuccess, this.onError);
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
                    scrollEnabled={false}>
                    
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Image style={{ height: 200, width: 200 }} resizeMode='cover' source={require('../../../../../assets/driver.png')}/>
                    </View>

                    <Form style={{ padding: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='keypad-outline' />
                            <Input 
                                keyboardType="number-pad" 
                                placeholder="Ingrese el código que le llego al celular"
                                onChangeText={code => this.setState({ code })}
                                value={this.state.code}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                keyboardType="default" 
                                placeholder="Ingrese una contraseña nueva"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}/>
                            {false && <Icon name='close-circle' />}
                        </Item>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='lock-closed' />
                            <Input 
                                keyboardType="default" 
                                placeholder="Repite la contraseña nueva"
                                onChangeText={repassword => this.setState({ repassword })}
                                value={this.state.repassword}/>
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
    }
}

export default connect(mapStateToProps, { passwordRecover })(PasswordRecover);

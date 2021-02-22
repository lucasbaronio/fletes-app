import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text } from 'native-base';

import { actions as auth } from "../../index"
const { passwordRecover } = auth;

import styles from './styles';

type MyProps = {
    passwordRecover: (data, onSuccess, onError) => void,
    codeId: string,
    navigation: any,
    // isLoading: boolean,
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
        this.setState({ error: '' }); //clear out error messages
        const { code, password, repassword } = this.state;

        if (password === repassword) {
            const { passwordRecover, codeId } = this.props;
            passwordRecover({ codeId, code, password }, this.onSuccess, this.onError)
        } else {
            this.showToast('Las contraseñas no son iguales')
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
        this.showToast(this.state.error)
    }

    render() {
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
                        <Item style={{ marginVertical: 10 }}>
                            <Button style={{ flex: 1, flexDirection: 'center', paddingVertical: 10 }}
                                onPress={this.onSubmit}>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                    Crear cuenta
                                </Text>
                            </Button>
                        </Item>
                    </Form>

                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        // isLoading: state.authReducer.isLoading,
        codeId: state.authReducer.codeId,
    }
}

export default connect(mapStateToProps, { passwordRecover })(PasswordRecover);

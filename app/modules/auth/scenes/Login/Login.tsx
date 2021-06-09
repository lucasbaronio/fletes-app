import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator, Pressable } from 'react-native';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index";
const { login } = auth;

import { isNotEmpty, validateMobileNumber } from '../../utils/validate';
import { 
    ERROR_EMPTY_MOBILE_NUMBER, 
    ERROR_EMPTY_PASSWORD, 
    ERROR_INCORRECT_MOBILE_NUMBER 
} from '../../../../config/strings';
import CustomModal from '../../../../components/CustomModal';
import { color } from '../../../../styles/theme';
import styles from './styles';

type MyProps = {
    login: (data, onSuccess, onError) => void,
    pushNotificationID: string,
    isLoading: boolean,
    navigation: any,
}
type MyState = {
    error: string,
    visibleModal: boolean,
    mobileNumber: string,
    password: string,
    showPassword: boolean,
}

class Login extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
            mobileNumber: '',
            password: '',
            // mobileNumber: '91000000',
            // password: 'strongPassword',
            showPassword: false,
        }
    }

    onForgotPassword = () => {
        const { navigation } = this.props;
        this.setState({ error: '', visibleModal: false });
        navigation.navigate('PasswordRecoverInit');
    }

    goToRegister = () => {
        const { navigation } = this.props;
        this.setState({ error: '', visibleModal: false });
        navigation.navigate('RegisterInit');
    }

    onSubmit = () => {
        this.setState({ error: '', visibleModal: false });

        const { mobileNumber, password } = this.state;
        const val1 = isNotEmpty(mobileNumber, () => {
            this.setState({ error: ERROR_EMPTY_MOBILE_NUMBER, visibleModal: true });
        });
        const val2 = val1 && isNotEmpty(password, () => {
            this.setState({ error: ERROR_EMPTY_PASSWORD, visibleModal: true });
        });
        const val3 = val1 && val2 && validateMobileNumber(mobileNumber, () => {
            this.setState({ error: ERROR_INCORRECT_MOBILE_NUMBER, visibleModal: true });
        });
        const mobileNumberWithCode = `598 ${mobileNumber}`

        if (val1 && val2 && val3) {
            const { login, pushNotificationID } = this.props;
            login({ mobileNumber: mobileNumberWithCode, password, pushNotificationID }, this.onSuccess, this.onError);
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
        const { showPassword, mobileNumber, password, error, visibleModal } = this.state;
        return (
            <Container>
                <Content 
                    padder={false}
                    scrollEnabled={false}
                >
                    <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                    <View style={{ alignItems: 'center', margin: 40 }}>
                        <Image 
                            style={{ width: '100%', height: 200 }} 
                            resizeMode='cover' 
                            source={require('../../../../../assets/fletesapp_icon.png')}/>
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
                                        Iniciar Sesión
                                    </Text>
                                }
                            </Pressable>
                        </View>
                    </Form>

                    <View style={styles.rowContainer}>
                        <Text>No tienes una cuenta? </Text>
                        <Text 
                            style={{ color: color.primary.dark }} 
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

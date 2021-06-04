import React from 'react';
import { View, Image, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Toast, Icon, Button, Text, Spinner } from 'native-base';

import { actions as auth } from "../../index"
const { passwordRecoverInit } = auth;

import { isNotEmpty, validateMobileNumber } from '../../utils/validate';
import { 
    ERROR_EMPTY_MOBILE_NUMBER, 
    ERROR_INCORRECT_MOBILE_NUMBER 
} from '../../../../config/strings';
import CustomModal from '../../../../components/CustomModal';
import { styles } from './styles';

type MyProps = {
    passwordRecoverInit: (data, onSuccess, onError) => void,
    navigation: any,
    isLoading: boolean,
    codeId: string,
}
type MyState = {
    error: string,
    visibleModal: boolean,
    mobileNumber: string,
}

class PasswordRecoverInit extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            visibleModal: false,
            mobileNumber: '',
        }
    }

    goToLogIn = () => {
        const { navigation } = this.props;
        this.setState({ error: '', visibleModal: false });
        navigation.navigate('Login');
    }

    onSubmit = () => {
        this.setState({ error: '', visibleModal: false });

        const { mobileNumber } = this.state;
        const val1 = isNotEmpty(mobileNumber, () => {
            this.setState({ error: ERROR_EMPTY_MOBILE_NUMBER, visibleModal: true });
        });
        const val2 = val1 && validateMobileNumber(mobileNumber, () => {
            this.setState({ error: ERROR_INCORRECT_MOBILE_NUMBER, visibleModal: true });
        });
        const mobileNumberWithCode = `598 ${mobileNumber}`

        if (val1 && val2) {
            const { passwordRecoverInit } = this.props;
            passwordRecoverInit({ mobileNumber: mobileNumberWithCode }, this.onSuccess, this.onError);
        }
    }

    onSuccess = () => {
        const { navigation, codeId } = this.props;
        console.log('codeId', codeId);
        navigation.navigate('PasswordRecover');
    }

    onError = (error) => {
        this.setState({ error, visibleModal: true });
    }

    onCloseModal = () => {
        this.setState({ visibleModal: false, error: '' });
    }

    render() {
        const { isLoading } = this.props;
        const { error, visibleModal } = this.state;
        return (
            <Container>
                <Content
                    padder={false}
                    scrollEnabled={false}>
                    <CustomModal message={error} visible={visibleModal} onClose={this.onCloseModal}/>
                    <View style={{ alignItems: 'center', margin: 40 }}>
                        <Image 
                            style={{ width: '100%', height: 200 }} 
                            resizeMode='cover' 
                            source={require('../../../../../assets/fletesapp_icon.png')}/>
                    </View>

                    <Form style={{ padding: 20 }}>
                        <Item rounded error={false} style={{ marginVertical: 10 }}>
                            <Icon name='phone-portrait' />
                            <Text style={{ color: '#000', fontWeight: 'bold' }}>🇺🇾 (+598)</Text>
                            <Input 
                                maxLength={9}
                                keyboardType="phone-pad" 
                                placeholder="Nro. celular"
                                onChangeText={mobileNumber => this.setState({ mobileNumber })}
                                value={this.state.mobileNumber}/>
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
                                        Recuperar contraseña
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
    }
}

export default connect(mapStateToProps, { passwordRecoverInit })(PasswordRecoverInit);

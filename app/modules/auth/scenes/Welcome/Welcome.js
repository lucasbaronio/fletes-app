import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import {Button, SocialIcon, Divider} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

// import { Facebook } from 'expo';
import { actions as auth, constants as c } from "../../index"
const { signInWithFacebook } = auth;

import styles from "./styles";

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}


        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
    }


    //get users permission authorization (ret: facebook token)
    async onSignInWithFacebook() {
        alert("Aún no esta disponible esta funcionalidad");
        // const options = { permissions: ['public_profile', 'email'] }
        // const { type, token } = await Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, options);

        // console.log(type, token);
        // if (type === 'success') {
        //     this.props.signInWithFacebook(token, this.onSuccess, this.onError)
        // }
    }

    onSuccess({ hasUserName, user}) {
        if (hasUserName) Actions.Main()
        else Actions.CompleteProfile({ user })
    }

    onError(error) {
        alert(error.message);
    }

    render() {
        return (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.image} source={require('../../../../assets/Pimbay-logo.png')}/>

                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>
                            <SocialIcon
                                raised
                                button
                                type='facebook'
                                title='Inicia Sesión con Facebook'
                                iconSize={19}
                                style={[styles.containerView, styles.socialButton]}
                                fontStyle={styles.buttonText}
                                onPress={this.onSignInWithFacebook}/>

                            <View style={styles.orContainer}>
                                <Divider style={styles.divider} />
                                <Text style={styles.orText}>
                                    O
                                </Text>
                            </View>

                            <Button
                                raised
                                borderRadius={4}
                                title={'Registrarse con email'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={Actions.Register}/>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.bottomText}>
                                Ya tenés una cuenta?
                            </Text>

                            <TouchableOpacity onPress={Actions.Login}>
                                <Text style={styles.signInText}>
                                    Iniciar Sesión
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
        );
    }
}


export default connect(null, { signInWithFacebook })(Welcome);
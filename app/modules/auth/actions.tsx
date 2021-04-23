import { deleteMany } from '../secureStore';
import * as t from './actionTypes';
// import * as tProfile from '../profile/actionTypes';
import * as api from './api';
// import { auth } from "../../config/firebase";

// import { AsyncStorage } from "react-native";

export const registerInit = (mobileNumber, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.signUpInit(mobileNumber, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.SIGN_UP_INIT, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const register = (codeAndPwdDTO, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        console.log(codeAndPwdDTO);
        api.signUp(codeAndPwdDTO, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.SIGN_UP, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const login = (logInDTO, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.logIn(logInDTO, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.LOG_IN, data});
                successCB();
            } 
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const passwordRecoverInit = (mobileNumber, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.passwordRecoverInit(mobileNumber, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.RECOVER_INIT, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const passwordRecover = (codeAndPwdDTO, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.passwordRecover(codeAndPwdDTO, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.RECOVER, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const logOut = (successCB, errorCB) => {
    return (dispatch) => {
        api.logOut((isSuccess, response, error) => {
            const keys = [
                'user_userId',
                'user_mobileNumber', 
                'user_name', 
                'user_lastName', 
                'user_pushNotificationID', 
                'session_token'
            ];
            deleteMany(keys);
            dispatch({type: t.LOG_OUT});
            if (isSuccess) 
                successCB();
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const logOutForce = (successCB) => {
    return (dispatch) => {
        dispatch({type: t.LOG_OUT});
        // successCB();
    };
}

export const checkLoginStatus = (successCB, errorCB) => {
    return (dispatch) => {
        console.log('checkLoginStatus');
        api.usersMe((isSuccess, response, error) => {
            console.log('usersMe_response', response);
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.USERS_ME, data});
                successCB();
            } 
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: t.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const savePushNotificationID = (pushNotificationID, successCB) => {
    return (dispatch) => {
        console.log('savePushNotificationID', pushNotificationID);
        dispatch({type: t.SAVE_PUSH_NOTIFICATION_ID, data: { pushNotificationID } });
        successCB();
    };
}

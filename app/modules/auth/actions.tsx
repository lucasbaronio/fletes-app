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
            else if (error) errorCB(error)
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
            else if (error) errorCB(error)
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
            else if (error) errorCB(error)
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
            else if (error) errorCB(error)
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
            else if (error) errorCB(error)
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
            else if (error) 
                errorCB(error);
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
            else if (error) errorCB(error) // Ver como hacer aca para si expiro su token, mandarlo al login
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

// export function checkLoginStatus(callback) {
//     return (dispatch) => {
//         auth.onAuthStateChanged((user) => {
//             let isLoggedIn = (user !== null);
            
//             if (isLoggedIn){
//                 api.getLoggedUser(user.email, function (success, data, error) {
//                     if (success) {
//                         const { exists, user } = data;
//                         if (exists) {
//                             dispatch({type: t.LOGGED_IN, data: user});
//                             dispatch({type: tProfile.USER_INFO_AVAILABLE, data: user, isLoggedUser: true });
//                         }
//                         callback(exists, isLoggedIn);
//                     }else if (error) {
//                         //unable to get user
//                         dispatch({type: t.LOGGED_OUT});
//                         callback(false, false);
//                     }
//                 });
//             }else {
//                 dispatch({type: t.LOGGED_OUT});
//                 callback(false, isLoggedIn);
//             }
//         });
//     };
// }

// export function signInWithFacebook(facebookToken, successCB, errorCB) {
//     return (dispatch) => {
//         api.signInWithFacebook(facebookToken, function (success, data, error) {
//             if (success) {
//                 if (data.hasUserName) dispatch({type: t.LOGGED_IN, data: data.user});
//                 successCB(data);
//             }else if (error) errorCB(error)
//         });
//     };
// }

// export function userLoggedInToCache(successCB) {
//     return async (dispatch) => {
//         const userId = await AsyncStorage.getItem('user_id');
//         if (userId) {
//             api.getUserById(userId, function (success, data, error) {
//                 if (success) dispatch({ type: t.COMPLETE_USER_INFO, data });
//                 else if (error) dispatch({ type: t.ONLY_USER_ID_INFO, data: userId });
//                 successCB();
//             });
//         } else successCB();
//     };
// }

import * as t from './actionTypes';
// import * as tProfile from '../profile/actionTypes';
import * as api from './api';
// import { auth } from "../../config/firebase";

// import { AsyncStorage } from "react-native";

export function registerInit(mobileNumber, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.signUpInit(mobileNumber, (isSuccess, data, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.SIGN_UP_INIT, data});
                successCB();
            }
            else if (error) errorCB(error)
        });
    };
}

export function register(codeAndPwdDTO, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.signUp(codeAndPwdDTO, (isSuccess, data, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.SIGN_UP_INIT, data});
                successCB();
            }
            else if (error) errorCB(error)
        });
    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.logIn(data, (isSuccess, data, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.LOG_IN, data});
                successCB();
            } 
            else if (error) errorCB(error)
        });
    };
}

export function passwordRecoverInit(mobileNumber, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.passwordRecoverInit(mobileNumber, (isSuccess, data, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.RECOVER_INIT, data});
                successCB();
            }
            else if (error) errorCB(error)
        });
    };
}

export function passwordRecover(codeAndPwdDTO, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.passwordRecover(codeAndPwdDTO, (isSuccess, data, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.RECOVER, data});
                successCB();
            }
            else if (error) errorCB(error)
        });
    };
}

export function logOut(successCB, errorCB) {
    return (dispatch) => {
        api.logOut(function (isSuccess, data, error) {
            if (isSuccess) {
                dispatch({type: t.LOG_OUT});
                successCB();
            } 
            else if (error) errorCB(error)
        });
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

// import { auth, database, provider } from "../../config/firebase";
import {
    API_AUTH_SIGN_UP_INIT,
    API_AUTH_SIGN_UP,
    API_AUTH_LOG_IN,
    API_AUTH_LOG_OUT,
    API_AUTH_RECOVER_INIT,
    API_AUTH_RECOVER,
    API_USERS_ME,
} from './constants';
import { get, post, deleteMethod } from '../globalApi';
import { getHeaderToken } from '../security';

// import { getUserById } from '../profile/api';
// export { getUserById }

type MobileNumberDTO = {
    mobileNumber: string,
}
type CodeAndPwdDTO = {
    codeId: string,
    code: string,
    password: string,
}
type LogInDTO = {
    mobileNumber: string,
    password: string,
}

export const signUpInit = (mobileNumber: MobileNumberDTO, callback) => {
    post(API_AUTH_SIGN_UP_INIT, mobileNumber, {}, callback)
}

export const signUp = (signUpDTO: CodeAndPwdDTO, callback) => {
    post(API_AUTH_SIGN_UP, signUpDTO, {}, callback)
}

export const logIn = (logInDTO: LogInDTO, callback) => {
    post(API_AUTH_LOG_IN, logInDTO, {}, callback)
}

export const logOut = (callback) => {
    deleteMethod(API_AUTH_LOG_OUT, getHeaderToken(), callback)
}

export const passwordRecoverInit = (mobileNumber: MobileNumberDTO, callback) => {
    post(API_AUTH_RECOVER_INIT, mobileNumber, {}, callback)
}

export const passwordRecover = (passwordRecovedDTO: CodeAndPwdDTO, callback) => {
    post(API_AUTH_RECOVER, passwordRecovedDTO, {}, callback)
}

export const usersMe = (callback) => {
    get(API_USERS_ME, getHeaderToken(), callback)
}


//Register the user using email and password
// export function register(data, callback) {
//     const { email, password, username, fullName } = data;
//     auth.createUserWithEmailAndPassword(email, password)
//         .then((resp) => {
//             createUser({ 
//                 mail: email,
//                 fullName,
//                 userName: username, 
//             }, callback)
//         })
//         .catch((error) => {
//             callback(false, null, error);
//         });
// }

// export function createUserChatCamp(user, callback) {
//     const { url, header, bodyExtra } = API_CREATE_USER_CHAT_CAMP();
//     post(url, { 
//         id: user.id,
//         display_name: user.fullName,
//         ...bodyExtra
//     }, header, callback);
// }

// export function getChatList(user, callback) {
//     const { url, header } = API_GET_CHAT_LIST();
//     post(url, { 
//         user_id: userId
//     }, header, callback);
// }

// export function updateUser ({ id, newUser }, callback) {
//     put(API_USER_BY_ID({ userId: id }), newUser, callback);
// }

// //Sign the user in with their email and password
// export function login(data, callback) {
//     const { email, password } = data;
//     auth.signInWithEmailAndPassword(email, password)
//         .then((resp) => getLoggedUser(resp.user.email, callback))
//         .catch((error) => callback(false, null, error));
// }

// export function getLoggedUser(email, callback) {
//     get(API_USER_BY_FIELD({ 
//         field: 'mail', 
//         value: email 
//     }), {}, function (success, userBD, error) {
//         if (success) {
//             const data = { exists: (userBD != null), user: userBD };
//             callback(true, data, null);
//         } else if (error) callback(true, { exists: false, user: null }, error)
//     });
// }

//Send Password Reset Email
// export function resetPassword(data, callback) {
//     const { email } = data;
//     auth.sendPasswordResetEmail(email)
//         .then((user) => callback(true, null, null))
//         .catch((error) => callback(false, null, error));
// }

// export function signOut(callback) {
//     auth.signOut()
//         .then(() => {
//             if (callback) callback(true, null, null)
//         })
//         .catch((error) => {
//             if (callback) callback(false, null, error)
//         });
// }


//Sign user in using Facebook
// export function signInWithFacebook (fbToken, callback) {
//     const credential = provider.credential(fbToken);
//     auth.signInAndRetrieveDataWithCredential(credential)
//         .then((userCredential) => {
//             console.log('userFB', userCredential.user.email);
            
//             getLoggedUser(userCredential.user.email, function (success, data, error) {
//                 console.log('success', success);
//                 if (success) {
//                     const { exists, user } = data;
//                     if (exists) {
//                         console.log('user', user.username);
//                         if (user.username) callback(true, { hasUserName: true, user }, null);
//                         else callback(true, { hasUserName: false, user }, null);
//                     } else {
//                         console.log('createUser');
//                         createUser({ 
//                             mail: userCredential.user.email,
//                             fullName: userCredential.user.displayName,
//                             avatar: userCredential.user.photoURL,
//                         }, function (success, userCreated, error) {
//                             console.log('success', success);
//                             if (success) callback(true, { hasUserName: false, user: userCreated }, null)
//                             else callback(false, null, error ? error : "Se ha producido un error, intente mas tarde.")
//                         })
//                     }
//                 } else callback(false, null, error ? error : "Se ha producido un error, intente mas tarde.")
//             })
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             if (errorCode === 'auth/account-exists-with-different-credential') {
//                 callback(false, null, { 
//                     message: "Este mail ya esta asociado a otra cuenta, pruebe iniciar sesion con mail y contraseña, de lo contrario recuperela."
//                 });
//             } else {
//                 callback(false, null, error);
//             }
//         });
// }
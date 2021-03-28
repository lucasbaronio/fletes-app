// import { auth, database, provider } from "../../config/firebase";
import {
    API_AUTH_SIGN_UP,
    API_AUTH_LOG_IN,
    API_AUTH_LOG_OUT,
    API_AUTH_RECOVER_INIT,
    API_AUTH_RECOVER,
    API_USERS_ME,
    API_ORDERS_INFO,
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
    pushNotificationID: string,
}
type LogInDTO = {
    mobileNumber: string,
    password: string,
    pushNotificationID: string,
}

export const getOrdersInfo = async (callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_INFO, header, callback);
}

export const signUp = (signUpDTO: CodeAndPwdDTO, callback) => {
    post(API_AUTH_SIGN_UP, signUpDTO, {}, callback)
}

export const logIn = (logInDTO: LogInDTO, callback) => {
    post(API_AUTH_LOG_IN, logInDTO, {}, callback)
}

export const logOut = async (callback) => {
    const header = await getHeaderToken();
    deleteMethod(API_AUTH_LOG_OUT, header, callback)
}

export const passwordRecoverInit = (mobileNumber: MobileNumberDTO, callback) => {
    post(API_AUTH_RECOVER_INIT, mobileNumber, {}, callback)
}

export const passwordRecover = (passwordRecovedDTO: CodeAndPwdDTO, callback) => {
    post(API_AUTH_RECOVER, passwordRecovedDTO, {}, callback)
}

export const usersMe = async (callback) => {
    const header = await getHeaderToken();
    get(API_USERS_ME, header, callback)
}


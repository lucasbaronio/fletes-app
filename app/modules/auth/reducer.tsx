// import { AsyncStorage } from 'react-native';
import { deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

let initialState = { 
    isLoading: false,
    isLoggedIn: false, 
    user: {
        userId: 0,
        mobileNumber: '',
        name: null,
        lastName: null,
        pushNotificationId: '',
        userType: ''
    },
    codeId: '',
    pushNotificationID: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }

        case t.LOG_IN: {
            const { user, session } = action.data;

            const saveItems = [
                { key: 'user_userId', value: user.userId },
                { key: 'user_mobileNumber', value: user.mobileNumber },
                { key: 'user_name', value: user.name },
                { key: 'user_lastName', value: user.lastName },
                { key: 'user_pushNotificationID', value: user.pushNotificationID },
                { key: 'session_token', value: session.token },
            ]
            saveMany(saveItems);

            return { ...state, isLoggedIn: true, user: user, isLoading: false };
        }

        case t.LOG_OUT: {
            const { pushNotificationID } = state;
            
            return { ...state, ...initialState, pushNotificationID };
        }

        case t.SIGN_UP_INIT: {
            const { codeId } = action.data;

            return { ...state, codeId, isLoading: false };
        }
        
        case t.SIGN_UP: {
            const { user, session } = action.data;

            const saveItems = [
                { key: 'user_userId', value: user.userId },
                { key: 'user_mobileNumber', value: user.mobileNumber },
                { key: 'user_name', value: user.name },
                { key: 'user_lastName', value: user.lastName },
                { key: 'user_pushNotificationID', value: user.pushNotificationID },
                { key: 'session_token', value: session.token },
            ]
            saveMany(saveItems);

            return { ...state, isLoggedIn: true, user: user, isLoading: false, codeId: '' };
        }

        case t.RECOVER_INIT: {
            const { codeId } = action.data;

            return { ...state, codeId, isLoading: false };
        }
        
        case t.RECOVER: {
            const { user, session } = action.data;

            const saveItems = [
                { key: 'user_userId', value: user.userId },
                { key: 'user_mobileNumber', value: user.mobileNumber },
                { key: 'user_name', value: user.name },
                { key: 'user_lastName', value: user.lastName },
                { key: 'user_pushNotificationID', value: user.pushNotificationID },
                { key: 'session_token', value: session.token },
            ]
            saveMany(saveItems);

            return { ...state, isLoggedIn: true, user: user, isLoading: false, codeId: '' };
        }

        case t.SAVE_PUSH_NOTIFICATION_ID: {
            const { pushNotificationID } = action.data;

            return { ...state, pushNotificationID };
        }

        case t.USERS_ME: {
            const { user } = action.data;

            const saveItems = [
                { key: 'user_userId', value: user.userId },
                { key: 'user_mobileNumber', value: user.mobileNumber },
                { key: 'user_name', value: user.name },
                { key: 'user_lastName', value: user.lastName },
                { key: 'user_pushNotificationID', value: user.pushNotificationID },
            ]
            saveMany(saveItems);

            return { ...state, isLoggedIn: true, user: user, isLoading: false };
        }

        default:
            return state;
    }
};

export default authReducer;
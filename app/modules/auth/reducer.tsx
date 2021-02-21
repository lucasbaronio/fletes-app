// import { AsyncStorage } from 'react-native';
import { save, getValue, deleteMany, saveMany } from '../secureStore';
import * as t from './actionTypes';

let initialState = { 
    isLoading: false,
    isLoggedIn: false, 
    user: null,
    codeId: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }

        case t.LOG_IN: {
            const { user, session } = action.data;

            // save('userId', user.userId);
            // save('mobileNumber', user.mobileNumber);
            // save('name', user.name);
            // save('lastName', user.lastName);
            // save('pushNotificationID', user.pushNotificationID);
            // save('token', session.token);

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
            const keys = ['user_userId', 'user_mobileNumber', 'user_name', 'user_lastName', 'user_pushNotificationID', 'session_token'];
            deleteMany(keys);
            
            return { ...state, initialState };
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

        default:
            return state;
    }
};

export default authReducer;
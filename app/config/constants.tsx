// export const FIREBASE_API_KEY = "AIzaSyAZXjQr7qvStK9zE-OuG4FW5uv05kDUC-k";
// export const FIREBASE_AUTH_DOMAIN = "pimbaymobile.firebaseapp.com";
// export const FIREBASE_DATABASE_URL = "https://pimbaymobile.firebaseio.com";
// export const FIREBASE_PROJECT_ID = "pimbaymobile";
// export const FIREBASE_STORAGE_BUCKET = "pimbaymobile.appspot.com";
// export const FIREBASE_MESSAGING_SENDER_ID = "619978772784";

// export const FACEBOOK_APP_ID = '197787241068265';

export const API = 'https://Z.Y.X.W/v1';

export const API_AUTH = `${API}/auth`;
export const API_AUTH_LOG_IN = () => `${API_AUTH}`;
export const API_AUTH_LOG_OUT = () => `${API_AUTH}`;
export const API_AUTH_SIGN_UP_INIT = () => `${API_AUTH}/signUp/init`;
export const API_AUTH_SIGN_UP = () => `${API_AUTH}/signUp`;
export const API_AUTH_RECOVER_INIT = () => `${API_AUTH}/password/recover/init`;
export const API_AUTH_RECOVER = () => `${API_AUTH}/password/recover`;

export const API_USERS = `${API}/users`;
export const API_USERS_ME = () => `${API_USERS}/me`;

export const API_EVENT_SIZE = 10;
export const API_EVENT = `${API}events`;
export const API_EVENTS_PAGINATION = ({ start }) => `${API_EVENT}/pagination?start=${start}&size=${API_EVENT_SIZE}`;
export const API_EVENT_BY_ID = ({ eventId }) => `${API_EVENT}/${eventId}`;
export const API_SEARCH_EVENTS = ({ value }) => `${API_EVENT}_search?search=${value}`;

export const API_INVITATION_SIZE = 10;
export const API_INVITATION = `${API}invitations`;
export const API_GET_INVITATION = ({ invitationId }) => `${API_INVITATION}/${invitationId}`;
export const API_INVITATIONS_PAGINATION = ({ start }) => `${API_INVITATION}?limit=${API_INVITATION_SIZE}&offset=${start}`;
export const API_INVITATIONS_IN = ({ userId }) => `${API_INVITATION}/${userId}/received`;
export const API_INVITATIONS_OUT = ({ userId }) => `${API_INVITATION}/${userId}/sended`;
export const API_FINALIZE_INVITATION = ({ invitationId }) => `${API_INVITATION}/${invitationId}`;
export const API_RESPONSE_INVITATION = ({ invitationId, userId }) => `${API_INVITATION}/${invitationId}/response?user=${userId}`;

export const API_CONTEXT_ACTION = `${API}context-actions`;
export const API_CONTEXT_ACTION_BY_ID = ({ contextActionId }) => `${API_CONTEXT_ACTION}/${contextActionId}`;

export const API_USER = `${API}users`;
export const API_GET_ALL_USERS = `${API}all-users`;
export const API_USER_BY_ID = ({ userId }) => `${API_USER}/${userId}`;
export const API_USER_BY_FIELD = ({ field, value }) => `${API_USER}/field?${field}=${value}`;
export const API_UPDATE_USER = ({ userId }) => `${API_USER}/${userId}`;
export const API_SEARCH_USERS = ({ value }) => `${API_USER}?search=${value}`;
export const API_ADD_FAVOURITE_USER = ({ myMail, mailToAdd }) => `${API_USER}/${myMail}/favorite?email_to_add=${mailToAdd}`;
export const API_REMOVE_FAVOURITE_USER = ({ myMail, mailToRemove }) => `${API_USER}/${myMail}/favorite?email_to_delete=${mailToRemove}`;
export const API_GET_FAVOURITE_USERS = ({ userId }) => `${API_USER}/${userId}/favorite`;

export const API_PUSH_NOTIFICATION = `${API}users/token`;

export const API_EXPO_PUSH = 'https://exp.host/--/api/v2/push/send';

export const API_SEND_NOTIFICATION = ({ chat, message, userToPushToken }) => {
    const titleAndBody = {
        title: `${message.user.display_name} @ ${chat.name}`,
        body: message.text,
    };
    return {
        url: API_EXPO_PUSH,
        body: {
            to: userToPushToken,
            ...titleAndBody,
            data: {
                ...titleAndBody,
                actionType: "NEW_CHAT_MESSAGE",
                id: chat.id
            }
        }
    }
};


export const API_CHATCAMP = 'https://api.chatcamp.io//api/1.0/';
export const X_APP_ID = '6470728469452943360';
export const X_API_KEY = 'WGVEUjY5UzZxZXVvallRVkNiaXdGdz09';
const HEADER_CHAT_CAMP = {
    'x-app-id': X_APP_ID,
    'x-api-key': X_API_KEY
};

export const API_GET_CHAT_LIST = () => {
    return {
        url: `${API_CHATCAMP}group_channels.my_list`, 
        header: HEADER_CHAT_CAMP
    }
};
export const API_CREATE_USER_CHAT_CAMP = () => {
    return {
        url: `${API_CHATCAMP}users.create`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {
            check_access_token: false
        }
    }
};
export const API_CREATE_CHAT_CHAT_CAMP = () => {
    return {
        url: `${API_CHATCAMP}group_channels.create`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {
            is_distinct: false
        }
    }
};
export const API_GET_CHAT_MESSAGES = () => {
    return {
        url: `${API_CHATCAMP}group_channels.history`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};
export const API_MARK_AS_READ_ALL_CHAT_MESSAGES = () => {
    return {
        url: `${API_CHATCAMP}users.mark_as_read_all`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};
export const API_SEND_MESSAGE = () => {
    return {
        url: `${API_CHATCAMP}group_channels.message`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {
            type: ""
        }
    }
};
export const API_ADD_USER_TO_CHAT = () => {
    return {
        url: `${API_CHATCAMP}group_channels.invite`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};
export const API_REMOVE_USER_FROM_CHAT = () => {
    return {
        url: `${API_CHATCAMP}group_channels.leave`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};
export const API_CHANGE_CHAT_NAME = () => {
    return {
        url: `${API_CHATCAMP}group_channels.update`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};
export const API_GET_CHAT_DETAIL = () => {
    return {
        url: `${API_CHATCAMP}group_channels.get`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};
export const API_UPDATE_USER_CHAT_CAMP = (body) => {
    return {
        url: `${API_CHATCAMP}users.update`, 
        header: HEADER_CHAT_CAMP,
        body
    }
};
export const API_DELETE_CHAT = () => {
    return {
        url: `${API_CHATCAMP}group_channels.delete`, 
        header: HEADER_CHAT_CAMP,
        bodyExtra: {}
    }
};

const GCP_API_KEY = "AIzaSyBLPUTSjHrq5JikApCOFJ0n2D8NFL5W0-Q";
export const API_GEOCODING_RESPONSES = ({ place }) => `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${GCP_API_KEY}`;
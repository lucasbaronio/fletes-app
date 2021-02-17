import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
// import { reducer as timelineReducer } from "../modules/timeline"
// import { reducer as invitationsReducer } from "../modules/myInvitations"
// import { reducer as profileReducer } from "../modules/profile"
// import { reducer as chatReducer } from "../modules/chats"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer });
// const rootReducer = combineReducers({ authReducer, timelineReducer, invitationsReducer, profileReducer, chatReducer });

export default rootReducer;
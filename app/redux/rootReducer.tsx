import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as ordersReducer } from "../modules/orders"
import { reducer as usersReducer } from "../modules/users"
import { reducer as userOrdersReducer } from "../modules/userOrders"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, ordersReducer, usersReducer, userOrdersReducer });

export default rootReducer;
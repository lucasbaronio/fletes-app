import * as t from './actionTypes';
import * as tAuth from '../auth/actionTypes';
import * as api from './api';
import { statusOrder } from '../../config/utils';

type OrderStatusCompleted = {
    orderId: number,
    rating: number,
    comments: string,
}

export const setUserOrderSelected = (order, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_SELECTED, data: { order }});
        successCB();
    };
}

export const getOrderUser = (orderId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getOrder(orderId, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.ORDER, data});
                successCB(data.order);
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const getActiveOrdersUser = (page, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getActiveOrders(page, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                if (page == 1) dispatch({type: t.ACTIVE_ORDERS, data});
                else dispatch({type: t.ACTIVE_ORDERS_PAGE, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const getHistoryOrdersUser = (page, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getHistoryOrdersUser(page, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                if (page == 1) dispatch({type: t.HISTORY_ORDERS, data});
                else dispatch({type: t.HISTORY_ORDERS_PAGE, data});
                successCB();
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const changeOrderStatusCanceled = (orderId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.orderStatusCanceled(orderId, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_CANCELED});
                successCB(statusOrder.CANCELED);
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const changeOrderStatusCompleted = (orderStatusCompleted: OrderStatusCompleted, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        const { orderId, rating, comments } = orderStatusCompleted;
        api.orderStatusCompleted(orderId, { rating, comments }, (isSuccess, response, error) => {
            console.log(response);
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_COMPLETED});
                successCB(statusOrder.COMPLETED);
            }
            else if (error) {
                if (error.error == 'invalidAccessToken') {
                    dispatch({ type: tAuth.LOG_OUT });
                }
                errorCB(error.message)
            }
        });
    };
}

export const setOrderRating = (rating, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_RATING, data: { rating }});
        successCB();
    };
}

export const setOrderComments = (comments, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_COMMENTS, data: { comments }});
        successCB();
    };
}

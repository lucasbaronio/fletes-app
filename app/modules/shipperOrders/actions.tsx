import * as t from './actionTypes';
import * as tAuth from '../auth/actionTypes';
import * as api from './api';
import * as apiUserOrders from '../userOrders/api';
import { statusOrder } from '../../config/utils';

type OrderStatusAccepted = {
    orderId: number,
    vehicle: any
}
type OrderStatusTo = {
    orderId: number,
    arrivesAt: any,
}

export const setShipperOrderSelected = (order, successCB) => {
    return (dispatch) => {
        dispatch({type: t.ORDER_SELECTED, data: { order }});
        successCB();
    };
}

export const getOrderShipper = (orderId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        apiUserOrders.getOrder(orderId, (isSuccess, response, error) => {
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

export const getOrdersPendingShipper = (successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getOrdersPendingShipper((isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.ORDERS_PENDING_SHIPPER, data});
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

export const getActiveOrdersShipper = (successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.getActiveOrdersShipper((isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                const { data } = response;
                dispatch({type: t.ORDERS_ACTIVE_SHIPPER, data});
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

export const changeOrderStatusAccepted = (orderStatusAccepted: OrderStatusAccepted, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        const { orderId, vehicle } = orderStatusAccepted;
        api.orderStatusAccepted(orderId, vehicle, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_ACCEPTED});
                successCB(statusOrder.ACCEPTED);
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

export const changeOrderStatusToOrigin = (orderStatusToOrigin: OrderStatusTo, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        const { orderId, arrivesAt } = orderStatusToOrigin;
        api.orderStatusToOrigin(orderId, arrivesAt, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_TO_ORIGIN});
                successCB(statusOrder.TO_ORIGIN);
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

export const changeOrderStatusAtOrigin = (orderId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.orderStatusAtOrigin(orderId, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_AT_ORIGIN});
                successCB(statusOrder.AT_ORIGIN);
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

export const changeOrderStatusToDestination = (orderStatusToDestination: OrderStatusTo, successCB, errorCB) => {
    console.log(orderStatusToDestination);
    return (dispatch) => {
        dispatch({type: t.LOADING});
        const { orderId, arrivesAt } = orderStatusToDestination;
        api.orderStatusToDestination(orderId, arrivesAt, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_TO_DESTINATION});
                successCB(statusOrder.TO_DESTINATION);
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

export const changeOrderStatusAtDestination = (orderId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.orderStatusAtDestination(orderId, (isSuccess, response, error) => {
            dispatch({type: t.LOADING});
            if (isSuccess) {
                dispatch({type: t.ORDER_AT_DESTINATION});
                successCB(statusOrder.AT_DESTINATION);
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

export const changeOrderStatusCompletePending = (orderId, successCB, errorCB) => {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        console.log('orderId', orderId);
        api.orderStatusCompletePending(orderId, (isSuccess, response, error) => {
            if (isSuccess) {
                dispatch({type: t.ORDER_COMPLETE_PENDING});
                apiUserOrders.getOrder(orderId, (isSuccess, response, error) => {
                    dispatch({type: t.LOADING});
                    if (isSuccess) {
                        const { data } = response;
                        dispatch({type: t.ORDER, data});
                        successCB(statusOrder.COMPLETE_PENDING);
                    }
                    else if (error) {
                        if (error.error == 'invalidAccessToken') {
                            dispatch({ type: tAuth.LOG_OUT });
                        }
                        errorCB(error.message)
                    }
                });
            }
            else {
                dispatch({type: t.LOADING});
                if (error) {
                    if (error.error == 'invalidAccessToken') {
                        dispatch({ type: tAuth.LOG_OUT });
                    }
                    errorCB(error.message)
                }
            }
        });
    };
}


import {
    API_ORDERS_INFO,
    API_ORDERS,
    API_ORDERS_ACTIVE,
    API_ORDERS_HISTORY,
    API_ORDERS_PENDING_SHIPPER,
    API_ORDER_ACCEPTED,
    API_ORDER_AT_DESTINATION,
    API_ORDER_AT_ORIGIN,
    API_ORDER_TO_ORIGIN,
    API_ORDER_TO_DESTINATION,
    API_ORDER_COMPLETE_PENDING,
    API_ORDER_CANCELED
} from './constants';
import { get, post, deleteMethod, patch } from '../globalApi';
import { getHeaderToken } from '../security';

export const getOrdersInfo = async (callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_INFO, header, callback);
}

export const getOrdersPendingShipper = async (callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_PENDING_SHIPPER, header, callback);
}

export const getActiveOrdersShipper = async (callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_ACTIVE, header, callback);
}

export const getHistoryOrdersShipper = async (callback) => {
    const header = await getHeaderToken();
    get(API_ORDERS_HISTORY, header, callback);
}

export const createOrder = async (createOrder, callback) => {
    const header = await getHeaderToken();
    post(API_ORDERS, createOrder, header, callback)
}

export const orderStatusAccepted = async (orderId, vehicleId, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_ACCEPTED(orderId), vehicleId, header, callback)
}

export const orderStatusToOrigin = async (orderId, arrivesAt, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_TO_ORIGIN(orderId), arrivesAt, header, callback)
}

export const orderStatusAtOrigin = async (orderId, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_AT_ORIGIN(orderId), null, header, callback)
}

export const orderStatusToDestination = async (orderId, arrivesAt, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_TO_DESTINATION(orderId), arrivesAt, header, callback)
}

export const orderStatusAtDestination = async (orderId, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_AT_DESTINATION(orderId), null, header, callback)
}

export const orderStatusCompletePending = async (orderId, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_COMPLETE_PENDING(orderId), null, header, callback)
}

export const orderStatusCanceled = async (orderId, callback) => {
    const header = await getHeaderToken();
    patch(API_ORDER_CANCELED(orderId), null, header, callback)
}

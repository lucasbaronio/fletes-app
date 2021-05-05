import { statusOrder } from '../../config/utils';
import * as t from './actionTypes';

type Order = {
    orderId: number,
    originAddress: any,
    destinationAddress: any,
    originAt: string,
    status: statusOrder,
    vehicleType: any,
    vehicle: any,
    user, any,
    shipper: any,
    extraOptions: any,
}

let activeOrders: Order[] = []
let historyOrders: Order[] = []

let initialState = { 
    isLoading: false,
    orderSelected: {
        orderId: 0,
        originAddress: {
            streetName: '',
            streetNumber: '',
            doorNumber: '',
            coords: {
                latitude: null,
                longitude: null,
            }
        },
        destinationAddress: {
            streetName: '',
            streetNumber: '',
            doorNumber: '',
            coords: {
                latitude: null,
                longitude: null,
            }
        },
        originAt: null,
        shipperArrivedAtOriginAt: null,
        shipperArrivesAtDestinationAt: null,
        shipperArrivesAtOriginAt: null,
        shipperCompletedAt: null,
        pricePerHour: null,
        finalPrice: null,
        fixedPrice: null,
        status: statusOrder.PENDING,
        vehicleType: {
            vehicleTypeId: 0,
            capacity: 0,
            pricePerHour: 0,
            open: false,
        },
        vehicle: {
            vehicleId: 0,
            model: '',
            registration: '',
            enabled: false,
            type: {
                vehicleTypeId: 0,
                capacity: 0,
                pricePerHour: 0,
                open: false,
            }
        },
        user: null,
        shipper: null,
        extraOptions: [],
        // paymentMethodId: null,
    },
    activeOrders, // Pedidos que fueron creados por el user y aún siguen activos
    historyOrders, // Pedidos que fueron creados por el user pero que ya finalizaron (COMPLETED o CANCELED)
};

const userOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }
        
        case t.ORDER_SELECTED: {
            const { order } = action.data;

            return { ...state, orderSelected: order };
        }

        case t.ORDER_CREATED: {
            const { order } = action.data;
            const { activeOrders } = state;

            return { 
                ...state, 
                orderSelected: order,
                activeOrders: activeOrders.concat(order),
            };
        }

        case t.ORDER: {
            const { order } = action.data;
            const { activeOrders, historyOrders, orderSelected } = state;
            switch (order.status) {
                case statusOrder.CANCELED:
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        activeOrders: activeOrders.filter(item => item.orderId !== order.orderId),
                        historyOrders: historyOrders.filter(item => item.orderId !== order.orderId).concat(order),
                    };
                case statusOrder.COMPLETED:
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        activeOrders: activeOrders.filter(item => item.orderId !== order.orderId),
                        historyOrders: historyOrders.filter(item => item.orderId !== order.orderId).concat(order),
                    };
                default: // Active order
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        activeOrders: activeOrders.filter(item => item.orderId !== order.orderId).concat(order)
                    };
            }
        }

        case t.ACTIVE_ORDERS: {
            const { orders } = action.data;

            return { 
                ...state, 
                activeOrders: orders,
            };
        }

        case t.ORDER_COMPLETED: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.COMPLETED 
                }
            };
        }

        case t.ORDER_CANCELED: {
            const { orderSelected, activeOrders, historyOrders } = state;
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.CANCELED 
                },
                activeOrders: activeOrders.filter(item => item.orderId !== orderSelected.orderId),
                historyOrders: [...historyOrders, orderSelected],
            };
        }

        default:
            return state;
    }
};

export default userOrdersReducer;
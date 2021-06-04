import { statusOrder } from '../../config/utils';
import { currentDate, dateToBackend } from '../orders/utils/utils';
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

let pendingOrders: Order[] = []
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
        rating: null,
        comments: ''
    },
    pendingOrders, // Pedidos que estan pendientes a ser aceptadas por el shipper 
    activeOrders, // Pedidos que ya fueron aceptados por el shipper y siguen activas
    historyOrders, // Pedidos que fueron aceptados por el shipper y que ya finalizaron (COMPLETED o CANCELED)
};

const shipperOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING: {
            return {...state, isLoading: !state.isLoading };
        }
        
        case t.ORDER_SELECTED: {
            const { order } = action.data;

            return { ...state, orderSelected: order };
        }

        case t.ORDER: {
            const { order } = action.data;
            const { pendingOrders, activeOrders, historyOrders, orderSelected } = state;
            switch (order.status) {
                case statusOrder.PENDING:
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        pendingOrders: pendingOrders.filter(item => item.orderId !== order.orderId).concat(order),
                    };
                case statusOrder.CANCELED:
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        activeOrders: activeOrders.filter(item => item.orderId !== order.orderId),
                        pendingOrders: pendingOrders.filter(item => item.orderId !== order.orderId),
                        historyOrders: historyOrders.filter(item => item.orderId !== order.orderId).concat(order),
                    };
                case statusOrder.COMPLETED:
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        activeOrders: activeOrders.filter(item => item.orderId !== order.orderId),
                        pendingOrders: pendingOrders.filter(item => item.orderId !== order.orderId),
                        historyOrders: historyOrders.filter(item => item.orderId !== order.orderId).concat(order),
                    };
                default: // Active order
                    return { 
                        ...state, 
                        orderSelected: orderSelected.orderId == order.orderId ? order : orderSelected, 
                        pendingOrders: pendingOrders.filter(item => item.orderId !== order.orderId),
                        activeOrders: activeOrders.filter(item => item.orderId !== order.orderId).concat(order),
                    };
            }
        }

        case t.ORDERS_PENDING_SHIPPER: {
            const { orders } = action.data;
            
            return { 
                ...state, 
                pendingOrders: orders,
            };
        }

        case t.ORDERS_PENDING_SHIPPER_PAGE: {
            const { orders } = action.data;
            const { pendingOrders } = state;
            
            return { 
                ...state, 
                pendingOrders: pendingOrders.concat(orders),
            };
        }

        case t.ORDERS_ACTIVE_SHIPPER: {
            const { orders } = action.data;
            
            return { 
                ...state, 
                activeOrders: orders,
            };
        }

        case t.ORDERS_ACTIVE_SHIPPER_PAGE: {
            const { orders } = action.data;
            const { activeOrders } = state;
            
            return { 
                ...state, 
                activeOrders: activeOrders.concat(orders),
            };
        }

        case t.ORDERS_HISTORY_SHIPPER: {
            const { orders } = action.data;
            
            return { 
                ...state, 
                historyOrders: orders,
            };
        }

        case t.ORDERS_HISTORY_SHIPPER_PAGE: {
            const { orders } = action.data;
            const { historyOrders } = state;
            
            return { 
                ...state, 
                historyOrders: historyOrders.concat(orders),
            };
        }

        case t.ORDER_ACCEPTED: {
            const { orderSelected, pendingOrders, activeOrders } = state;

            return { 
                ...state, 
                activeOrders: [...activeOrders, { 
                    ...orderSelected, 
                    status: statusOrder.ACCEPTED 
                }],
                pendingOrders: pendingOrders.filter(order => order.orderId !== orderSelected.orderId),
                orderSelected: { 
                    ...orderSelected, 
                    status: statusOrder.ACCEPTED 
                } 
            };
        }

        case t.ORDER_TO_ORIGIN: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.TO_ORIGIN 
                } 
            };
        }

        case t.ORDER_AT_ORIGIN: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    shipperArrivedAtOriginAt: dateToBackend(currentDate()),
                    status: statusOrder.AT_ORIGIN 
                } 
            };
        }

        case t.ORDER_TO_DESTINATION: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.TO_DESTINATION 
                } 
            };
        }

        case t.ORDER_AT_DESTINATION: {
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.AT_DESTINATION 
                } 
            };
        }

        case t.ORDER_CANCELED: {
            const { orderSelected, activeOrders, pendingOrders, historyOrders } = state;
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    status: statusOrder.CANCELED,
                },
                activeOrders: activeOrders.filter(item => item.orderId !== orderSelected.orderId),
                pendingOrders: pendingOrders.filter(item => item.orderId !== orderSelected.orderId),
                historyOrders: [...historyOrders, { 
                    ...state.orderSelected, 
                    status: statusOrder.CANCELED,
                }],
            };
        }

        // case t.ORDER_COMPLETE_PENDING: {
        //     return { 
        //         ...state, 
        //         orderSelected: { 
        //             ...state.orderSelected, 
        //             shipperCompletedAt: dateToBackend(currentDate()),
        //             status: statusOrder.COMPLETE_PENDING 
        //         } 
        //     };
        // }

        case t.VEHICLE_SELECTED: {
            const { vehicle } = action;
            
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    vehicle,
                }
            };
        }

        case t.ORIGIN_AT: {
            const { originAt } = action;
            console.log(originAt)
            
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    shipperArrivesAtOriginAt: originAt,
                }
            };
        }

        case t.DESTINATION_AT: {
            const { destinationAt } = action;
            
            return { 
                ...state, 
                orderSelected: { 
                    ...state.orderSelected, 
                    shipperArrivesAtDestinationAt: destinationAt,
                }
            };
        }

        default:
            return state;
    }
};

export default shipperOrdersReducer;
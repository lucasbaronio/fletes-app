import * as t from './actionTypes';
import * as RootNavigation from '../../../config/routes/rootNavigation';

export default function notificationRouter({ notification,
    // navigation, 
    pushBackgrounded,
    getOrderShipper,
    setShipperOrderSelected, 
    getOrderUser,
    setUserOrderSelected,
}) {
    const { data } = notification.request.content;
    console.log(notification);
    pushBackgrounded ? console.log('Push afuera', data) : console.log('Push adentro', data);
    if (data.actionType) {
        console.log(new Date(), data.actionType);
        switch (data.actionType) {
            case t.ORDER_PENDING_TO_SHIPPER: {
                getOrderShipper(data.id, (order) => {
                    if (pushBackgrounded) {
                        setShipperOrderSelected(order, () => {
                            RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'MapShipperOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'PendingShipperOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_ACCEPTED_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_CANCELED_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_CANCELED_TO_SHIPPER: {
                getOrderShipper(data.id, (order) => {
                    if (pushBackgrounded) {
                        setShipperOrderSelected(order, () => {
                            RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'MapShipperOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'PendingShipperOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_TO_ORIGIN_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_AT_ORIGIN_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_TO_DESTINATION_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_AT_DESTINATION_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_COMPLETE_PENDING_TO_USER: {
                getOrderUser(data.id, (order) => {
                    if (pushBackgrounded) {
                        setUserOrderSelected(order, () => {
                            RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }

            case t.ORDER_COMPLETED_TO_SHIPPER: {
                getOrderShipper(data.id, (order) => {
                    if (pushBackgrounded) {
                        setShipperOrderSelected(order, () => {
                            RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'MapShipperOrderDetails' });
                        });
                    }
                }, (error) => {
                    if (pushBackgrounded) {
                        RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'PendingShipperOrders' });
                        alert(`Se produjo un error al cargar el pedido: ${error}`);
                    }
                });
                break;
            }
    
            default:
                return null;
        }
    }
    
}

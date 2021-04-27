import * as t from './actionTypes';
import * as RootNavigation from '../../../config/routes/rootNavigation';

export default function notificationRouter({ notification,
    // navigation, 
    getOrderShipper, 
    getOrderUser,
}) {
    const { data } = notification.request.content;
    console.log(data);
    if (data.actionType) {
        switch (data.actionType) {
            case t.ORDER_PENDING_TO_SHIPPER: {
                getOrderShipper(data.id, () => {
                    RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'MapShipperOrderDetails' });
                }, (error) => {
                    RootNavigation.navigate('ShipperPendingOrdersRoutes', { screen: 'PendingShipperOrders' });
                    alert(`Se produjo un error al cargar el pedido: ${error}`);
                });
                break;
            }

            case t.ORDER_ACCEPTED_TO_USER: {
                getOrderUser(data.id, () => {
                    RootNavigation.navigate('UserOrdersRoutes', { screen: 'MapUserOrderDetails' });
                }, (error) => {
                    RootNavigation.navigate('UserOrdersRoutes', { screen: 'ActiveUserOrders' });
                    alert(`Se produjo un error al cargar el pedido: ${error}`);
                });
                break;
            }
    
            default:
                return null;
        }
    }
    
}

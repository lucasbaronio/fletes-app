import { showToast } from '../../Toast';
import * as t from './actionTypes';

export default function notificationRouter({ notification,
    navigation, 
    getOrderShipper, 
    getOrderUser,
}) {
    const { data } = notification.request.content;
    if (data.actionType) {
        switch (data.actionType) {
            case t.ORDER_PENDING_TO_SHIPPER: {
                getOrderShipper(data.id, () => {
                    navigation.navgate('MapShipperOrderDetails');
                }, (error) => {
                    navigation.navgate('MapShipperOrderDetails');
                    showToast(`Se produjo un error al cargar el pedido: ${error}`);
                    // alert(`Se produjo un error al cargar el pedido: ${error}`);
                });
                break;
            }

            case t.ORDER_ACCEPTED_TO_USER: {
                getOrderUser(data.id, () => {
                    navigation.navgate('MapShipperOrderDetails');
                }, (error) => {
                    navigation.navgate('MapShipperOrderDetails');
                    showToast(`Se produjo un error al cargar el pedido: ${error}`);
                });
                break;
            }

            // case t.USER_CONFIRMS_ASSISTANCE: {
            //     getInvitation(data.id, (invitation) => {
            //         getRejectedUsers({ rejectedUsers: invitation.rejectedUsers }, this.onError);
            //         getConfirmedUsers({ confirmedUsers: invitation.confirmedUsers }, () => {
            //             Actions.push("InvitationDetails", { invitation });
            //         }, this.onError);
            //     }, this.onError);
            //     break;
            // }

            // case t.USER_LEFT_INVITATION: {
            //     getInvitation(data.id, (invitation) => {
            //         getRejectedUsers({ rejectedUsers: invitation.rejectedUsers }, this.onError);
            //         getConfirmedUsers({ confirmedUsers: invitation.confirmedUsers }, () => {
            //             Actions.push("InvitationDetails", { invitation });
            //         }, this.onError);
            //     }, this.onError);
            //     break;
            // }
    
            default:
                return null;
        }
    }
    
}

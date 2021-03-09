import * as t from './actionTypes';

export default function notificationRouter({ notification, 
    // getChatDetail, 
    // getInvitation, 
    // getConfirmedUsers, 
    // getRejectedUsers
}) {
    const { data } = notification.request.content;
    if (data.actionType) {
        switch (data.actionType) {
            case t.NEW_DIRECT_INVITATION: {
                // getInvitation(data.id, (invitation) => {
                //     getRejectedUsers({ rejectedUsers: invitation.rejectedUsers }, this.onError);
                //     getConfirmedUsers({ confirmedUsers: invitation.confirmedUsers }, () => {
                //         Actions.push("InvitationDetails", { invitation });
                //     }, this.onError);
                // }, this.onError);
                break;
            }

            case t.NEW_CHAT_MESSAGE: {
                // getChatDetail(data.id, ({ group_channel }) => {
                //     Actions.push("ChatMessenger", { chat: group_channel });
                // }, this.onError);
                break;
            }

            case t.USER_CONFIRMS_ASSISTANCE: {
                // getInvitation(data.id, (invitation) => {
                //     getRejectedUsers({ rejectedUsers: invitation.rejectedUsers }, this.onError);
                //     getConfirmedUsers({ confirmedUsers: invitation.confirmedUsers }, () => {
                //         Actions.push("InvitationDetails", { invitation });
                //     }, this.onError);
                // }, this.onError);
                break;
            }

            case t.USER_LEFT_INVITATION: {
                // getInvitation(data.id, (invitation) => {
                //     getRejectedUsers({ rejectedUsers: invitation.rejectedUsers }, this.onError);
                //     getConfirmedUsers({ confirmedUsers: invitation.confirmedUsers }, () => {
                //         Actions.push("InvitationDetails", { invitation });
                //     }, this.onError);
                // }, this.onError);
                break;
            }
    
            default:
                return null;
        }
    }
    
}

import React from 'react';
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { View } from 'react-native';
// import DefaultPopup from 'react-native-push-notification-popup';
// import notificationRouter from './notificationRouter';

import { actions as auth } from "../../../modules/auth/index"
const { savePushNotificationID } = auth;

import { registerForPushNotificationsAsync } from './registerForPushNotificationsAsync';
import notificationRouter from './notificationRouter';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

type MyProps = {
    savePushNotificationID: (pushNotificationID, successCB) => void,
}
const withNotificationExpoHOC = WrappedComponent => connect(mapStateToProps, { savePushNotificationID })(
    class extends React.Component<MyProps> {
        notificationListener: any;
        responseListener: any;

        constructor(props) {
            super(props)

            this.notificationListener = React.createRef();
            this.responseListener = React.createRef();
        }

        componentDidMount() {
            const { savePushNotificationID } = this.props;
            registerForPushNotificationsAsync().then(token => {
                // setExpoPushToken(token)
                console.log('registerForPushNotificationsAsync', token);
                savePushNotificationID(token, () => {})
            });

            // This listener is fired whenever a notification is received while the app is foregrounded
            this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                // setNotification(notification);
                console.log("Push adentro", notification);
                // this.popup.show({
                //     onPress: () => notificationRouter({ notification, ...this.props }),
                //     appIconSource: require('../../../../assets/pimbay.png'),
                //     appTitle: 'Pimbay',
                //     timeText: 'Ahora',
                //     title: notification.data.title ? notification.data.title : 'Sin Título',
                //     body: notification.data.body ? notification.data.body : 'Notificación sin un body 😀',
                // });
                notificationRouter({ notification, ...this.props });
            });

            // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
            this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log("Push afuera", response);
                notificationRouter({ notification: response.notification, ...this.props });
            });
        }

        componentWillUnmount() {
            Notifications.removeNotificationSubscription(this.notificationListener.current);
            Notifications.removeNotificationSubscription(this.responseListener.current);
        }

        render() {
            return (
                <View style={{flex: 1}}>
                    {/* <DefaultPopup ref={ref => this.popup = ref} /> */}
                    <WrappedComponent {...this.props} />
                </View>
            );
        }
    }
)

function mapStateToProps(state, props) {
    return {
        isLoading: state.authReducer.isLoading
    }
}

export default withNotificationExpoHOC;
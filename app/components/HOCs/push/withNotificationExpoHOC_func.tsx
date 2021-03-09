import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { View } from 'react-native';
// import DefaultPopup from 'react-native-push-notification-popup';
// import notificationRouter from './notificationRouter';

import { registerForPushNotificationsAsync } from './registerForPushNotificationsAsync';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const withNotificationExpoHOC = WrappedComponent =>
    connect(null, { })(
        function(props) {

            const [expoPushToken, setExpoPushToken] = useState('');
            const [notification, setNotification] = useState(false);
            const notificationListener = useRef();
            const responseListener = useRef();

            useEffect(() => {
                registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

                // This listener is fired whenever a notification is received while the app is foregrounded
                notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                    setNotification(notification);
                });

                // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
                responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                    console.log(response);
                });

                return () => {
                    Notifications.removeNotificationSubscription(notificationListener.current);
                    Notifications.removeNotificationSubscription(responseListener.current);
                };
            }, []);

            return (
                <View style={{flex: 1}}>
                    {/* <DefaultPopup ref={ref => this.popup = ref} /> */}
                    <WrappedComponent {...props} />
                </View>
            );
        }
    )

export default withNotificationExpoHOC;
import moment from "moment";
import 'moment/min/locales';
import * as Localization from 'expo-localization';
// import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';
// import store from '../../../redux/store';
// import * as t from '../actionTypes';
// import * as api from '../api';

export const displayDate = (date) => {
    moment.locale(Localization.locale.substring(0,2));
    const dateMoment = moment(date).tz(Localization.timezone);
    const now = moment(new Date()).tz(Localization.timezone);
    const diff = now.diff(dateMoment, 'days');
    if (diff > 6 || diff < -6) {
        return dateMoment.format('LLLL');
    } else {
        return dateMoment.calendar();
    }
}

export const displayHistoryDate = (date) => {
    moment.locale(Localization.locale.substring(0,2));
    const dateMoment = moment(date).tz(Localization.timezone);
    return dateMoment.format('LLLL');
}

export const currentDate = () => {
    moment.locale(Localization.locale.substring(0,2));
    return moment(new Date()).tz(Localization.timezone).format();
}

export const dateToMoment = (date) => {
    return moment(date).tz(Localization.timezone).format();
}

export const dateToBackend = (date) => {
    moment.locale(Localization.locale.substring(0,2));
    // console.log(moment(date).format());
    // console.log(moment.utc(date).format());
    return moment(date).format();
}

export const dateToFrontend = (date) => {
    moment.locale(Localization.locale.substring(0,2));
    return moment(date).tz(Localization.timezone).format();
}

// const GEOFENCING_ORIGIN = 'GEOFENCING_ORIGIN_TASK';
// const GEOFENCING_DESTINATION = 'GEOFENCING_DESTINATION_TASK';

// TaskManager.defineTask(GEOFENCING_ORIGIN, ({ data: { eventType, region }, error }) => {
//     if (error) {
//       // check `error.message` for more details.
//       return;
//     }
//     if (eventType === Location.LocationGeofencingEventType.Enter) {
//         console.log("You've entered region:", region);
//         api.orderStatusAtOrigin(region.identifier, (isSuccess, response, error) => {
//             if (isSuccess) {
//                 store.dispatch({type: t.ORDER_AT_ORIGIN});
//             } else if (error) alert('....')
//         })
//     } else if (eventType === Location.LocationGeofencingEventType.Exit) {
//         console.log("You've left region:", region);
//         api.orderStatusToDestination(region.identifier, null, (isSuccess, response, error) => {
//             if (isSuccess) {
//                 store.dispatch({type: t.ORDER_TO_DESTINATION});
//             } else if (error) alert('....')
//             // Probar si esto anda, sino se tiene que ejecutar cuando el transportista cambie el estado a COMPLETE_PENDING
//             Location.stopGeofencingAsync(GEOFENCING_ORIGIN)
//         })
//         }
// });
  
// TaskManager.defineTask(GEOFENCING_DESTINATION, ({ data: { eventType, region }, error }) => {
//     if (error) {
//       // check `error.message` for more details.
//       return;
//     }
//     if (eventType === Location.LocationGeofencingEventType.Enter) {
//         console.log("You've entered region:", region);
//         api.orderStatusAtDestination(region.identifier, (isSuccess, response, error) => {
//             if (isSuccess) {
//                 store.dispatch({type: t.ORDER_AT_DESTINATION});
//             } else if (error) alert('....')
//             // Probar si esto anda, sino se tiene que ejecutar cuando el transportista cambie el estado a COMPLETE_PENDING
//             Location.stopGeofencingAsync(GEOFENCING_DESTINATION)
//         })
//     }
// });
import moment from "moment";
import 'moment/min/locales';
import * as Localization from 'expo-localization';
// import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';
// import store from '../../../redux/store';
// import * as t from '../actionTypes';
// import * as api from '../api';

export const displayDate = (date) => {
    moment.locale('es');
    const dateMoment = moment(date).tz(Localization.timezone);
    const now = moment(new Date()).tz(Localization.timezone);
    const diff = now.diff(dateMoment, 'days');
    if (diff > 6 || diff < -6) {
        return dateMoment.format('LLLL');
    } else {
        return dateMoment.calendar();
    }
}

export const currentDate = () => {
    moment.locale('es');
    return moment(new Date()).tz(Localization.timezone).format();
}

export const dateToMoment = (date) => {
    return moment(date).tz(Localization.timezone).format();
}

export const dateToBackend = (date) => {
    moment.locale('es');
    // console.log(moment.utc(date));
    // console.log(moment.utc(date).format());
    return moment.utc(date).format();
}

export const dateToFrontend = (date) => {
    moment.locale('es');
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
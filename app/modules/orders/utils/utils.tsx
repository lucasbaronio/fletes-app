import moment from "moment";
import 'moment/min/locales';
import * as Localization from 'expo-localization';

export const displayDate = (date) => {
    moment.locale(Localization.locale);
    const dateMoment = moment(date);
    const now = moment(new Date());
    const diff = now.diff(dateMoment, 'days');
    if (diff > 6 || diff < -6) {
        return moment(date).format('LLLL');
    } else {
        // return moment(date).locale('es').calendar();
        return moment(date).calendar();
    }
}

export const currentDate = () => {
    moment.locale(Localization.locale);
    return moment(new Date()).format();
}

export const dateToMoment = (date) => {
    return moment(date).format();
}

export const dateToBackend = (date) => {
    moment.locale(Localization.locale);
    // console.log(moment.utc(date));
    // console.log(moment.utc(date).format());
    return moment.utc(date).format();
}

export const dateToFrontend = (date) => {
    moment.locale(Localization.locale);
    return moment(date).format();
}

// export const displayDateFromFormat = (date, format) => {
//     moment.locale(Localization.locale);
//     const dateMoment = moment(date, format);
//     const now = moment(new Date());
//     const diff = now.diff(dateMoment, 'days');
//     if (diff > 6 || diff < -6) {
//         return moment(dateMoment).format('LLLL');
//     } else {
//         return moment(dateMoment).locale('es').calendar();
//     }
// }
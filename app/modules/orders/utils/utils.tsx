import moment from "moment";
import "moment-timezone";
import 'moment/min/locales'; 
import * as Localization from 'expo-localization';

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

export const currentDate = () => {
    moment.locale(Localization.locale.substring(0,2));
    return moment(new Date()).tz(Localization.timezone).format();
}

export const currentDateMoment = () => {
    moment.locale(Localization.locale.substring(0,2));
    return moment(new Date()).tz(Localization.timezone);
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

export const timeDiffMinutes = (to, from) => {
    return moment(to).diff(moment(from), 'minutes');
}

export const timeDiffSeconds = (to, from) => {
    return moment(to).diff(moment(from), 'seconds');
}

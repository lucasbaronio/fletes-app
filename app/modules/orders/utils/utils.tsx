import moment from "moment";
import "moment-timezone";
import 'moment/min/locales'; 
import * as Localization from 'expo-localization';

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

export const timeDiffMinutes = (to, from) => {
    return moment(to).diff(moment(from), 'minutes');
}

export const timeDiffSeconds = (to, from) => {
    return moment(to).diff(moment(from), 'seconds');
}

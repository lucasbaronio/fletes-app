import moment from "moment";
import 'moment/min/locales';

export const displayDate = (date) => {
    const dateMoment = moment(date);
    const now = moment(new Date());
    const diff = now.diff(dateMoment, 'days');
    if (diff > 6 || diff < -6) {
        return moment(date).format('LLLL');
    } else {
        return moment(date).locale('es').calendar();
    }
}

export const displayDateFromFormat = (date, format) => {
    const dateMoment = moment(date, format);
    const now = moment(new Date());
    const diff = now.diff(dateMoment, 'days');
    if (diff > 6 || diff < -6) {
        return moment(dateMoment).format('LLLL');
    } else {
        return moment(dateMoment).locale('es').calendar();
    }
}
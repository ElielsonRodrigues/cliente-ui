import Moment from 'moment';

export default class DateTime {
    formatDateTime(date) {
        if (date) {
            return Moment(date).format("DD/MM/YYYY h:mm:ss a");
        }
        return;
    }
    formatDate(date) {
        if (date) {
            return Moment(date).utc().format("DD/MM/YYYY");
        }
        return;
    }
    formatDateDB(date) {
        if (date) {
            return Moment(date).utc().format("YYYY-MM-DD");
        }
        return;
    }
    formatDateTime24hours(date) {
        if (date) {
            return Moment(date).format("DD/MM/YYYY HH:mm:ss");
        }
        return;
    }
    formatDateInput(date) {
        if (date) {
            return date.replace("T00:00:00.000+00:00", "");
        }
    }

    formatDateToName(date) {
        if (date) {
            return Moment(date).locale('pt-br').format("LL").toUpperCase();
        }
    }
}
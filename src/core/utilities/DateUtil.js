import moment from "moment";

export default class DateUtil {

    static toHumanReadable(date){
        return moment(date).locale('ru').calendar();
    }
    static getAgeByBirthDate(dateString){
        const
            today = new Date(),
            birthDate = new Date(dateString),
            month = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        return age;
    }
    static time(date){
        const dateObj = new Date(date);

        return dateObj.toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
        });
    }
    static isValid(dateString){
        const date = new Date(dateString);

        return !isNaN( date.getTime() );
    }
    static isBeforeToday(dateString){
        const
            date = new Date(dateString),
            today = new Date();

        today.setHours(0,0,0,0);

        return date < today;
    }
    /**
     * https://stackoverflow.com/questions/2012589/php-mysql-year-2038-bug-what-is-it-how-to-solve-it
     */
    static isValidForMysql(dateString){
        const
            date = new Date(dateString),
            lastMysqlDate = new Date('2038-01-01');

        return date <= lastMysqlDate;
    }

}


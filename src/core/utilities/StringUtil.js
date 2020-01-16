export default class StringUtil {

    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    static isEmpty(value){
        return StringUtil.isString(value) && value.trim() === '';
    }
    static linebreakToBr(value){
        return value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

}


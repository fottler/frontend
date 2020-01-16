import ArrayUtil from "@/core/utilities/ArrayUtil";
import StringUtil from "@/core/utilities/StringUtil";

export default class ObjectUtil {

    static copyWithoutEmptyProps(object){
        const excludedValues = [null, undefined, false];
        let result = {};

        for (const [key, value] of Object.entries(object)) {
            if(
                !excludedValues.includes(value)
                && !ArrayUtil.isEmpty(value)
                && !ObjectUtil.isEmpty(value)
                && !StringUtil.isEmpty(value)
            ){
                result[key] = value;
            }
        }
        return result;
    }
    static copyWithoutNullProps(object){
        let result = {};

        for (const [key, value] of Object.entries(object)) {
            if(value !== null){
                result[key] = value;
            }
        }
        return result;
    }
    static isObject(value) {
        const type = typeof value;

        return value != null && (type === 'object' || type === 'function')
    }
    static isEmpty(object){
        return ObjectUtil.isObject(object)
            && Object.entries(object).length === 0
            && object.constructor === Object;
    }
    static isNotEmpty(object){
        return ObjectUtil.isObject(object)
            && Object.entries(object).length;
    }

}


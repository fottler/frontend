import ObjectUtil from "@/core/utilities/ObjectUtil";

export default class ModelUtil {

    static mapFields(fields){
        const result = {};

        fields.forEach((name)=>{
            result[name] = {
                get() {
                    return this.$attrs[name];
                },
                set(newValue) {
                    this.$emit('update:'+ name, newValue);
                }
            };
        });
        return result;
    }
    static mapFieldsFromKeys(fields){
        const result = [];

        Object.keys(fields)
            .forEach((name)=>{
            if(Array.isArray(fields[name]) || !ObjectUtil.isObject(fields[name])){
                result.push(name);
            }
        });
        return ModelUtil.mapFields(result);
    }

}


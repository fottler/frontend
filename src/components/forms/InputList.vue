<template>
    <div>
        <label v-for="(item, index) in options"
               :key="index"
               :class="fullLabelClass">

            <input :type="type"
                   :name="name"
                   :value="item[optionsValuePropName]"
                   :checked="isChecked(item[optionsValuePropName])"
                   @change="onChange">

            <span :class="type"></span>
            {{item[optionsCaptionPropName]}}
        </label>
    </div>
</template>

<script>
    import Constants from "@/core/Constants";

    export default {
        name: 'InputList',
        props: {
            type: String,
            name: String,
            value: [Array, String, Number],
            options: [Array, Object],
            optionsCaptionPropName: {
                type: String,
                default: 'title'
            },
            optionsValuePropName: {
                type: String,
                default: 'id'
            },
            optionsValuePropType: {
                type: String,
                default: Constants.STRING
            },
            labelClass: String
        },
        computed: {
            valueIsArray(){
                return Array.isArray(this.value);
            },
            fullLabelClass(){
                return this.type +'-wrapper '+ this.labelClass;
            }
        },
        methods: {
            isChecked(itemValue){
                if(this.valueIsArray){
                    const values = this.value.map(item => ''+item);

                    return values.includes(''+itemValue);
                }
                else{
                    return ''+this.value === ''+itemValue;
                }
            },
            onChange(event){
                const isChecked = event.target.checked;
                let valueArr = this.type==='checkbox' ? [...this.value] : [],
                    newValue = event.target.value,
                    value = null;

                newValue = this.optionsValuePropType === Constants.INTEGER ? parseInt(newValue) : newValue;

                if(isChecked){
                    valueArr.push(newValue);
                    value = newValue;
                }
                else{
                    valueArr = valueArr.filter(item => item !== newValue);
                }
                this.$emit('input', (this.valueIsArray ? valueArr : value));
            }
        }
    }
</script>

<template>
    <input :value="value"
           :readonly="!editable"
           @input="$emit('input', $event.target.value)"
           @click="onClick"
           @blur="onBlur">
</template>

<script>
    export default {
        name: 'EditableInput',
        props: {
            value: String
        },
        data(){
            return {
                editable: false
            }
        },
        methods: {
            onClick(){
                this.editable = true;
            },
            onBlur(){
                this.editable = false;
            },
        }
    }
</script>

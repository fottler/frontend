<template>
    <label class="switcher-wrapper">
        <input type="checkbox"
               :checked="!!value"
               @change="onChange">

        <span class="bg"></span>
        <span class="handle"></span>
    </label>
</template>

<script>
    export default {
        name: 'Switcher',
        props: {
            value: [Boolean, Number]
        },
        methods: {
            onChange(event){
                this.$emit('input', event.target.checked);
            }
        }
    }
</script>
